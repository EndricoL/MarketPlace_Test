'use client'

import { useEffect, useState } from 'react'

export default function ManageOrders() {
  const [orders, setOrders] = useState([])
  const sellerId = typeof window !== 'undefined' ? localStorage.getItem('seller_id') : null

  const fetchOrders = () => {
    fetch(`/api/seller-orders?seller_id=${sellerId}`)
      .then(res => res.json())
      .then(data => setOrders(data))
  }

    useEffect(() => {
    if (sellerId) fetchOrders()
  }, [sellerId])

 const updateStatus = async (orderId, action) => {
  const res = await fetch('/api/seller-orders', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id: orderId, action })
  })
  const data = await res.json()
  if (data.error) {
    alert(`Gagal update status: ${data.error}`)
  } else {
    alert('Status berhasil diupdate')
    fetchOrders()
  }
}

  // Fungsi untuk format tanggal ke dd-mm-yyyy
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const buttonStyle = (bgColor) => ({
    padding: '8px 15px',
    backgroundColor: bgColor,
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#333', minHeight: '100vh' }}>
  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#40E0D0', marginBottom: '20px' }}>
    Manage Orders
  </h1>

  {orders.map(order => (
    <div
      key={order.id}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#444',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <p style={{ color: '#fff' }}><b>Buyer:</b> {order.buyer?.name}</p>
      <p style={{ color: '#fff' }}><b>Status:</b> {order.status}</p>
      <p style={{ color: '#fff' }}><b>Tanggal Order:</b> {formatDate(order.created_at)}</p>

      <h4 style={{ marginTop: '15px', color: '#fff' }}>Items:</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {order.order_items.map(item => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              backgroundColor: '#444',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #eee'
            }}
          >
            <img
              src={item.product.image_url}
              alt={item.product.name}
              width="50"
              style={{ marginRight: '10px', borderRadius: '5px' }}
            />
            <span style={{ color: '#fff' }}>
              {item.product.name} - Qty: {item.quantity} - Harga: Rp {item.price}
            </span>
          </li>
        ))}
      </ul>

      {/* Button sesuai status */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {order.status === 'pending' && (
          <>
            <button
              onClick={() => updateStatus(order.id, 'confirm')}
              style={buttonStyle('#40E0D0')}
            >
              Confirm
            </button>
            <button
              onClick={() => updateStatus(order.id, 'reject')}
              style={buttonStyle('#FF4C4C')}
            >
              Reject
            </button>
          </>
        )}
        {order.status === 'confirmed' && (
          <>
            <button
              onClick={() => updateStatus(order.id, 'ready')}
              style={buttonStyle('#FFA500')}
            >
              Ready to Pick Up
            </button>
            <button
              onClick={() => updateStatus(order.id, 'cancel')}
              style={buttonStyle('#FF4C4C')}
            >
              Cancel
            </button>
          </>
        )}
        {order.status === 'ready_to_pickup' && (
          <button
            onClick={() => updateStatus(order.id, 'done')}
            style={buttonStyle('#28A745')}
          >
            Done
          </button>
        )}
      </div>
    </div>
  ))}
</div>


  )
}
