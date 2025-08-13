import { supabase } from '@/lib/supabaseClient'

export async function POST(request) {
  const body = await request.json()
  const { buyer_id, inventory_id, qty } = body

  if (!buyer_id || !inventory_id || !qty) {
    return new Response(JSON.stringify({ error: 'Data tidak lengkap' }), { status: 400 })
  }

  // Ambil seller_id, product_id, dan price dari seller_inventory
  const { data: invData, error: invError } = await supabase
    .from('seller_inventory')
    .select('product_id, seller_id, price')
    .eq('id', inventory_id)
    .single()

  if (invError || !invData) {
    return new Response(JSON.stringify({ error: 'Inventory tidak ditemukan' }), { status: 400 })
  }

  // Insert ke orders
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      buyer_id,
      seller_id: invData.seller_id,
      status: 'pending'
    }])
    .select()
    .single()

  if (orderError) {
    return new Response(JSON.stringify({ error: orderError.message }), { status: 500 })
  }

  // Insert ke order_items
  const { error: itemError } = await supabase
    .from('order_items')
    .insert([{
      order_id: order.id,
      product_id: invData.product_id,
      quantity: qty,
      price: invData.price // penting, ambil dari inventory
    }])

  if (itemError) {
    return new Response(JSON.stringify({ error: itemError.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ message: 'Order berhasil dibuat' }), { status: 200 })
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const buyerId = searchParams.get('buyer_id')

  if (!buyerId) {
    return new Response(JSON.stringify({ error: 'Buyer ID diperlukan' }), { status: 400 })
  }

  // Ambil semua order milik buyer
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select(`
      id,
      seller_id,
      status,
      created_at,
      seller:users!orders_seller_id_fkey (id, name),
      order_items (
        id,
        quantity,
        price,
        product:products (id, name, image_url)
      )
    `)
    .eq('buyer_id', buyerId)
    .order('created_at', { ascending: false })

  if (ordersError) {
    return new Response(JSON.stringify({ error: ordersError.message }), { status: 500 })
  }

  return new Response(JSON.stringify(orders), { status: 200 })
}
