import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get('seller_id')

  if (!sellerId) {
    return new Response(JSON.stringify({ error: 'Seller ID diperlukan' }), { status: 400 })
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      image_url,
      description,
      seller_inventory:seller_inventory!left (
        id,
        stock,
        price,
        seller_id
      )
    `)
    .eq('seller_inventory.seller_id', sellerId) // filter di join
    .order('id')

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const formatted = data.map(p => {
    const inv = (p.seller_inventory || []).find(si => si.seller_id === sellerId)
    return {
      id: p.id,
      inventory_id: inv?.id || null,
      name: p.name,
      image_url: p.image_url,
      description: p.description,
      stock: inv?.stock || '',
      price: inv?.price || ''
    }
  })

  return new Response(JSON.stringify(formatted), { status: 200 })
}

export async function POST(request) {
  const body = await request.json()
  const { seller_id, product_id, stock, price } = body

  if (!seller_id || !product_id) {
    return new Response(JSON.stringify({ error: 'Seller ID dan Product ID diperlukan' }), { status: 400 })
  }

  // Cek apakah seller sudah punya item ini
  const { data: existing } = await supabase
    .from('seller_inventory')
    .select('*')
    .eq('seller_id', seller_id)
    .eq('product_id', product_id)
    .maybeSingle()

  let result
  if (existing) {
    // Update stok & harga
    const { data, error } = await supabase
      .from('seller_inventory')
      .update({ stock, price })
      .eq('id', existing.id)
      .select()
    result = { data, error }
  } else {
    // Insert baru
    const { data, error } = await supabase
      .from('seller_inventory')
      .insert([{ seller_id, product_id, stock, price }])
      .select()
    result = { data, error }
  }

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(result.data), { status: 200 })
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