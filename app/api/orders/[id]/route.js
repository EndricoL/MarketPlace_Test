import { supabase } from '@/lib/supabaseClient'

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()

  const { data, error } = await supabase
    .from('orders')
    .update({ status: body.status })
    .eq('id', id)

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ message: 'Status updated', data }), { status: 200 })
}

export async function DELETE(request, { params }) {
  const { id } = await params

  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ message: 'Order deleted' }), { status: 200 })
}
