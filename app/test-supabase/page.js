import { supabase } from '@/lib/supabaseClient'

export default async function TestSupabase() {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    console.error(error)
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Data dari tabel users:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}