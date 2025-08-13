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
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#333',
        borderRadius: '8px',
        margin: '20px 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // border: '2px solid #fff',
      }}
    >
 
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px', // Jarak antar field
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
    
      <div style={{ flex: '1', paddingBottom: '16px' }}>
        <label style={{ fontSize: '14px', color: '#fff', marginBottom: '6px', display: 'block' }}>
          Nama Produk:
        </label>
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
          }}
        />
      </div>

      <div style={{ flex: '1', paddingBottom: '16px' }}>
        <label style={{ fontSize: '14px', color: '#fff', marginBottom: '6px', display: 'block' }}>
          URL Gambar:
        </label>
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
          }}
        />
      </div>

        <div style={{ flex: '1', paddingBottom: '16px', minWidth: '250px' }}>
          <label style={{ fontSize: '14px', color: '#fff', marginBottom: '6px', display: 'block' }}>
            Deskripsi:
          </label>
          <textarea
            name="description"
            placeholder="Deskripsi"
            value={form.description}
            onChange={handleChange}
            required
            style={{
              width: 'calc(100% - 20px)', 
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #fff',
              fontSize: '14px',
              color: '#333',
              backgroundColor: '#f0f0f0',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#FF7F32',
            color: '#fff',
            border: '1px solid #fff',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#FF5722')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#FF7F32')}
        >
          Simpan
        </button>
      </div>
    </form>

  )
}
