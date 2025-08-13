import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get('seller_id')

  if (!sellerId) {
    return new Response(JSON.stringify({ error: 'Seller ID diperlukan' }), { status: 400 })
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
    .eq('seller_id', sellerId)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const formatted = data.map(item => ({
    inventory_id: item.id,
    product_id: item.products.id,
    name: item.products.name,
    image_url: item.products.image_url,
    description: item.products.description,
    stock: item.stock,
    price: item.price
  }))

  return new Response(JSON.stringify(formatted), { status: 200 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID inventory diperlukan' }), { status: 400 })
  }

  const { error } = await supabase
    .from('seller_inventory')
    .delete()
    .eq('id', id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ message: 'Item berhasil dihapus' }), { status: 200 })
}
