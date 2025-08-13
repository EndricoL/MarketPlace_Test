import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase DELETE error:', error)
      return res.status(500).json({ message: 'Gagal menghapus produk' })
    }

    return res.status(200).json({ message: 'Produk berhasil dihapus' })
  }
  if (req.method === 'PUT') {
  const { name, image_url, description } = req.body

  const { error } = await supabase
    .from('products')
    .update({ name, image_url, description })
    .eq('id', id)

  if (error) {
    console.error('Supabase UPDATE error:', error)
    return res.status(500).json({ message: 'Gagal mengupdate produk' })
  }

  return res.status(200).json({ message: 'Produk berhasil diupdate' })
}


  return res.status(405).json({ message: 'Metode tidak diizinkan' })
}
