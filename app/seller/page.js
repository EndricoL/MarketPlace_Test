'use client'
import { useEffect, useState } from 'react'
import { handleLogout } from '@/lib/logout'

export default function SellerDashboard() {
  const [products, setProducts] = useState([])
  const [sellerName, setSellerName] = useState('')
  const sellerId = typeof window !== 'undefined' ? localStorage.getItem('seller_id') : null

  useEffect(() => {
    const name = localStorage.getItem('seller_name')
    if (name) {
      setSellerName(name)
    }
    if (sellerId) {
      fetch(`/api/seller-dashboard?seller_id=${sellerId}`)
        .then(res => res.json())
        .then(data => setProducts(data))
    }
  }, [sellerId])

  const handleDelete = async (inventoryId) => {
    if (!confirm('Yakin hapus item ini?')) return

    const res = await fetch(`/api/seller-inventory?id=${inventoryId}`, {
      method: 'DELETE'
    })
    const data = await res.json()

    if (data.error) {
      alert(`Gagal hapus: ${data.error}`)
    } else {
      alert('Item berhasil dihapus')
      setProducts(prev => prev.filter(p => p.inventory_id !== inventoryId))
    }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', minHeight: '100vh' }}>
      {/* Logout di kanan atas */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#FF4C4C',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#e03e3e'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#FF4C4C'}
        >
          Logout
        </button>
      </div>

      {/* Judul di tengah */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <h1 style={{ color: '#40E0D0', fontSize: '28px', marginBottom: '10px' }}>Seller Dashboard</h1>
        <h2 style={{ color: '#fff' }}>Welcome, {sellerName}</h2>
      </div>

      {/* Tabel Produk */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#40E0D0', color: '#fff' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Produk</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Stok</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Harga</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.inventory_id || p.id} style={{ backgroundColor: '#333', borderBottom: '1px solid #444' }}>
              <td style={{ padding: '10px' }}>
                <Image src={p.image_url} alt={p.name} width="50" style={{ borderRadius: '5px' }} />
              </td>
              <td style={{ padding: '10px' }}>{p.name}</td>
              <td style={{ padding: '10px' }}>{p.description}</td>
              <td style={{ padding: '10px' }}>{p.stock}</td>
              <td style={{ padding: '10px' }}>{p.price ? `Rp ${p.price}` : ''}</td>
              <td style={{ padding: '10px' }}>
                {p.inventory_id && (
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
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigasi */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <a href="/seller/inventory">
          <button
            style={{
              backgroundColor: '#FF7F32',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '0 10px',
            }}
          >
            Manage Inventory
          </button>
        </a>
        <a href="/seller/orders">
          <button
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '0 10px',
            }}
          >
            Manage Orders
          </button>
        </a>
      </div>
    </div>


  )
}
