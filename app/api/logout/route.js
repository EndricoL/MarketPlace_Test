import { supabase } from '@/lib/supabaseClient'

export async function POST() {
  try {
    // Logout dari Supabase Auth
    await supabase.auth.signOut()

    // Return sukses
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('Logout error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
