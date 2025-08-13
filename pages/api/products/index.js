import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, image, description } = req.body

    if (!name || !image || !description) {
      return res.status(400).json({ message: 'Semua field wajib diisi' })
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, image_url: image, description }])

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ message: 'Gagal menyimpan ke database' })
    }

    return res.status(200).json({ message: 'Produk berhasil disimpan', data })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ message: 'Gagal mengambil data produk' })
    }

    return res.status(200).json(data)
  }

  return res.status(404).json({ message: 'Route tidak ditemukan' })
}
