import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID diperlukan' }), { status: 400 })
  }

  const { data, error } = await supabase
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
    .eq('id', id)
    .maybeSingle()

  if (error || !data) {
    return new Response(JSON.stringify({ error: error?.message || 'Produk tidak ditemukan' }), { status: 404 })
  }

  const formatted = {
    inventory_id: data.id,
    product_id: data.products.id,
    name: data.products.name,
    image_url: data.products.image_url,
    description: data.products.description,
    stock: data.stock,
    price: data.price
  }

  return new Response(JSON.stringify(formatted), { status: 200 })
}
