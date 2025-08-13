import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase() || ''

  let query = supabase
    .from('seller_inventory')
    .select(`
      id,
      stock,
      price,
      products (
        id,
        name,
        image_url,
        description
      )
    `)
    .gt('stock', 0) // hanya yang stok > 0

  if (q) {
    query = query.ilike('products.name', `%${q}%`)
  }

  const { data, error } = await query

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const formatted = data.map(item => ({
    inventory_id: item.id,
    product_id: item.products?.id,
    name: item.products?.name,
    image_url: item.products?.image_url,
    description: item.products?.description,
    stock: item.stock,
    price: item.price
  }))

  return new Response(JSON.stringify(formatted), { status: 200 })
}
