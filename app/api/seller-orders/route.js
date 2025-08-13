import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get('seller_id')

  if (!sellerId) {
    return new Response(JSON.stringify({ error: 'Seller ID diperlukan' }), { status: 400 })
  }

  // Ambil orders milik seller + join buyer & order_items + products
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      buyer:users!buyer_id(name, email),
      created_at,
      seller_id,
      order_items (
        id,
        quantity,
        price,
        product:products(name, image_url)
      )
    `)
    .eq('seller_id', sellerId)
    .order('id', { ascending: false })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(data), { status: 200 })
}

export async function PATCH(req) {
  try {
    const body = await req.json()
    const { order_id, action } = body

    if (!order_id || !action) {
      return new Response(JSON.stringify({ error: 'order_id dan action wajib diisi' }), { status: 400 })
    }

    let newStatus = ''
    switch (action) {
      case 'confirm':
        newStatus = 'confirmed'
        break
      case 'reject':
        newStatus = 'canceled'
        break
      case 'ready':
        newStatus = 'ready_to_pickup'
        break
      case 'done':
        newStatus = 'done'
        break
      case 'cancel':
        newStatus = 'canceled'
        break
      default:
        return new Response(JSON.stringify({ error: 'Action tidak valid' }), { status: 400 })
    }

    const { data: orderData, error: orderErr } = await supabase
      .from('orders')
      .select('seller_id')
      .eq('id', order_id)
      .maybeSingle()

    if (orderErr || !orderData) {
      return new Response(JSON.stringify({ error: 'Gagal ambil seller dari order' }), { status: 500 })
    }

    const sellerId = orderData.seller_id

    // Kalau ready, kurangi stok
    console.log('ACTIONNYA:', action)
    if (action === 'ready') {
        const { data: items, error: itemErr } = await supabase
            .from('order_items')
            .select('product_id, quantity')
            .eq('order_id', order_id)

        if (itemErr) {
            return new Response(JSON.stringify({ error: itemErr.message }), { status: 500 })
        }

        for (const item of items) {
            // Ambil inventory berdasarkan product_id dan seller_id
            const { data: inv, error: invErr } = await supabase
                .from('seller_inventory')
                .select('id, stock')
                .eq('product_id', item.product_id)
                .eq('seller_id', sellerId) // pastikan sellerId tersedia
                .maybeSingle()

            if (invErr) {
                return new Response(JSON.stringify({ error: invErr.message }), { status: 500 })
            }

            if (!inv) {
                return new Response(JSON.stringify({ error: `Inventory tidak ditemukan untuk produk ${item.product_id}` }), { status: 404 })
            }
            console.log(inv.stock)
            console.log(item.quantity)
            const newStock = Math.max(inv.stock - item.quantity, 0)
            console.log(newStock)

            const { error: updateErr } = await supabase
            .from('seller_inventory')
            .update({ stock: newStock })
            .eq('id', inv.id)
        }
    }

    // Update status order
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', order_id)

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, newStatus }), { status: 200 })
  } catch (err) {
    console.error('API error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

