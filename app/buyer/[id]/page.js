'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function BuyerDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetch(`/api/buyer-products-detail?id=${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p>Loading...</p>

  const handleQtyChange = (e) => {
    const value = Number(e.target.value)
    if (value > product.stock) {
      alert(`Maksimal pembelian ${product.stock}`)
      return
    }
    setQty(value)
  }

  const handleBuy = async () => {
    const confirm = window.confirm('Apakah Anda yakin ingin membeli produk ini?')
    if (!confirm) {
        return
    }
    const buyerId = localStorage.getItem('buyer_id')
    if (!buyerId) {
      alert('Anda harus login sebagai buyer')
      return
    }

    const res = await fetch('/api/buyer-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyer_id: buyerId,
        inventory_id: product.inventory_id, // Pastikan API detail kirim inventory_id
        qty
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert('Order berhasil dibuat')
      // optional: redirect ke halaman list order buyer
    } else {
      alert(`Gagal order: ${data.error}`)
    }
  }

  return (
    <div
  style={{
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  }}
>
  <h1 style={{ color: '#40E0D0', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
    Halaman Detail
  </h1>

  {/* Container dengan border */}
  <div
    style={{
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: '#fefefe',
    }}
  >
    {/* Gambar */}
    <div style={{ flex: '1', maxWidth: '250px' }}>
      <Image
        src={product.image_url}
        alt={product.name}
        style={{ width: '100%', borderRadius: '8px' }}
      />
    </div>

    {/* Informasi produk */}
    <div style={{ flex: '2' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
        {product.name}
      </h2>
      <p style={{ fontSize: '15px', color: '#555', marginBottom: '8px' }}>{product.description}</p>
      <p style={{ fontSize: '15px', color: '#40E0D0', marginBottom: '4px', fontWeight: 'bold' }}>
        Harga: Rp {product.price}
      </p>
      <p style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: 'bold' }}>
        Stock tersedia: {product.stock}
      </p>
    </div>
  </div>

  {/* Input jumlah dan tombol beli */}
  <div style={{ marginBottom: '20px' }}>
    <label style={{ marginRight: '10px', fontWeight: 'bold', color: '#888' }}>Jumlah:</label>
    <input
      type="number"
      min="1"
      max={product.stock}
      value={qty}
      onChange={handleQtyChange}
      style={{
        padding: '6px',
        width: '80px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
        backgroundColor: '#f9f9f9',
        color: '#888'
      }}
    />
  </div>

  <button
    style={{
      padding: '8px 16px',
      backgroundColor: '#40E0D0',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
    }}
    onClick={handleBuy}
  >
    Beli
  </button>
</div>

  )
}
