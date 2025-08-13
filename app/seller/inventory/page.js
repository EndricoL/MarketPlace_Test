'use client'
import { useEffect, useState } from 'react'

export default function ManageInventory() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({})
  const sellerId = typeof window !== 'undefined' ? localStorage.getItem('seller_id') : null

  useEffect(() => {
  if (sellerId) {
    fetch(`/api/manage-inventory?seller_id=${sellerId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        const preload = {}
        data.forEach(p => {
          preload[p.id] = { stock: p.stock, price: p.price }
        })
        setFormData(preload)
      })
  }
}, [sellerId])

  const handleChange = (productId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }))
  }

  const handleSave = async (productId) => {
    const payload = {
      seller_id: sellerId,
      product_id: productId,
      stock: Number(formData[productId]?.stock || 0),
      price: Number(formData[productId]?.price || 0)
    }

    const res = await fetch('/api/manage-inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    alert(data.error ? `Gagal: ${data.error}` : 'Berhasil disimpan')
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus item ini?')) return

    const res = await fetch(`/api/manage-inventory?id=${id}`, {
      method: 'DELETE'
    })
    const data = await res.json()

    if (data.error) {
      alert(`Gagal hapus: ${data.error}`)
    } else {
      alert('Item berhasil dihapus')
      setProducts(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
  <h1 style={{ color: '#FF7F32', textAlign: 'center', fontSize: '28px' }}>Manage Inventory</h1>
  
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
    <thead>
      <tr style={{ backgroundColor: '#007BFF', color: '#fff' }}>
        <th style={{ padding: '10px', textAlign: 'center' }}>Produk</th>
        <th style={{ padding: '10px', textAlign: 'center' }}>Gambar</th>
        <th style={{ padding: '10px', textAlign: 'center', width: '30%' }}>Deskripsi</th>
        <th style={{ padding: '10px', textAlign: 'center' }}>Stok</th>
        <th style={{ padding: '10px', textAlign: 'center' }}>Harga</th>
        <th style={{ padding: '10px', textAlign: 'center' }}>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {products.map(p => (
        <tr key={p.id} style={{ backgroundColor: '#444', borderBottom: '1px solid #555' }}>
          <td style={{ padding: '10px' }}>{p.name}</td>
          <td style={{ padding: '10px', textAlign: 'center' }}>
            <img src={p.image_url} alt={p.name} width="50" style={{ borderRadius: '5px' }} />
          </td>
          <td style={{ padding: '10px' }}>{p.description}</td>
          <td style={{ padding: '10px', textAlign: 'center' }}>
            <input
              type="number"
              value={formData[p.id]?.stock || ''}
              onChange={e => handleChange(p.id, 'stock', e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#222',
                color: '#fff',
                width: '80px',
                textAlign: 'center',
              }}
            />
          </td>
          <td style={{ padding: '10px', textAlign: 'center' }}>
            <input
              type="number"
              value={formData[p.id]?.price || ''}
              onChange={e => handleChange(p.id, 'price', e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#222',
                color: '#fff',
                width: '120px',
                textAlign: 'center',
              }}
            />
          </td>
          <td style={{ padding: '10px', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => handleSave(p.id)}
                style={{
                  backgroundColor: '#FF7F32',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Simpan
              </button>
              <button
                onClick={() => handleDelete(p.inventory_id)}
                style={{
                  backgroundColor: '#FF4136',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Hapus
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}
