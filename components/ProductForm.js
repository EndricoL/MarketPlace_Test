import { useState } from 'react'
import { createProduct } from '@/lib/api'

export default function ProductForm({ onRefresh }) {
  const [form, setForm] = useState({
    name: '',
    image: '',
    description: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createProduct(form)
    setForm({ name: '', image: '', description: '' })
    onRefresh()
  }

  return (
    // <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
    //   <h2>Tambah Produk</h2>
    //   <input
    //     name="name"
    //     placeholder="Nama Produk"
    //     value={form.name}
    //     onChange={handleChange}
    //     required
    //   />
    //   <input
    //     name="image"
    //     placeholder="URL Gambar"
    //     value={form.image}
    //     onChange={handleChange}
    //     required
    //   />
    //   <textarea
    //     name="description"
    //     placeholder="Deskripsi"
    //     value={form.description}
    //     onChange={handleChange}
    //     required
    //   />
    //   <button type="submit">Simpan</button>
    // </form>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'flex-start', // Ke kiri
        gap: '20px', // Jarak antar input
        padding: '20px',
        backgroundColor: '#000', // Latar belakang hitam
        borderRadius: '8px',
        margin: '20px auto', // Memberi jarak sedikit dari atas halaman
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #fff', // Menambahkan border putih di luar
        flexWrap: 'wrap', // Memastikan responsif
      }}>
    
      <div style={{ flex: '1 1 300px' }}>
        <label style={{ fontSize: '14px', color: '#fff' }}>Nama Produk:</label>
        <input
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #fff',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#f0f0f0',
            marginTop: '5px',
          }}
        />
      </div>
      
      <div style={{ flex: '1 1 300px' }}>
        <label style={{ fontSize: '14px', color: '#fff' }}>URL Gambar:</label>
        <input
          name="image"
          placeholder="URL Gambar"
          value={form.image}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #fff',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#f0f0f0',
            marginTop: '5px',
          }}
        />
      </div>
      
      <div style={{ flex: '1 1 300px' }}>
        <label style={{ fontSize: '14px', color: '#fff' }}>Deskripsi:</label>
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #fff',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#f0f0f0',
            marginTop: '5px',
            resize: 'vertical', // Dapat diubah ukuran vertikal
          }}
        />
      </div>

      {/* Tombol Simpan di bawah URL Gambar */}
      <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          type="submit"
          style={{
            padding: '8px 16px', // Ukuran tombol lebih kecil
            backgroundColor: '#FF7F32', // Warna oranye
            color: '#fff',
            border: '1px solid #fff', // Border putih
            borderRadius: '4px',
            fontSize: '14px', // Ukuran font lebih kecil
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#FF5722'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF7F32'}
        >
          Simpan
        </button>
      </div>
    </form>
  )
}
