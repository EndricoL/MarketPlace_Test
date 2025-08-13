import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const seller_id = searchParams.get('seller_id')

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('seller_id', seller_id)

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function POST(request) {
  const body = await request.json()

  const { data, error } = await supabase.from('orders').insert([body])

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 201 })
}
