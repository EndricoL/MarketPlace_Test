'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { handleLogout } from '@/lib/logout'

export default function BuyerPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [tab, setTab] = useState('products')

  const fetchProducts = async (q = '') => {
    let url = '/api/buyer-products'
    if (q) {
      url += `?q=${encodeURIComponent(q)}`
    }
    const res = await fetch(url)
    const data = await res.json()
    setProducts(data)
  }

  const fetchOrders = async () => {
    const buyerId = localStorage.getItem('buyer_id')
    if (!buyerId) return
    const res = await fetch(`/api/buyer-orders?buyer_id=${buyerId}`)
    const data = await res.json()
    setOrders(data)
  }

  useEffect(() => {
    const name = localStorage.getItem('buyer_name')
    if (name) setBuyerName(name)
    fetchProducts()
    fetchOrders()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim() === '') {
      fetchProducts()
    } else {
      fetchProducts(search)
    }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#40E0D0', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
          Welcome, {buyerName}
        </h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#FF4C4C',
            color: '#fff',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#e03e3e'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#FF4C4C'}
        >
          Logout
        </button>
      </div>

      {/* Tab Switch + Search */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <button
            onClick={() => setTab('products')}
            style={{
              padding: '8px 15px',
              backgroundColor: tab === 'products' ? '#40E0D0' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Produk
          </button>
          <button
            onClick={() => setTab('orders')}
            style={{
              padding: '8px 15px',
              backgroundColor: tab === 'orders' ? '#40E0D0' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Riwayat Pesanan
          </button>
        </div>

        {tab === 'products' && (
          <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari barang..."
              style={{
                padding: '8px',
                width: '250px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                fontSize: '14px',
                color: '#000'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 15px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Cari
            </button>
          </form>
        )}
      </div>

      {/* Tab Content */}
      {tab === 'products' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
            marginTop: '20px',
            minWidth: '1000px',
          }}
        >
          {products
            .filter(p => p.name?.toLowerCase().includes(search.trim().toLowerCase()))
            .map(p => (
              <div
                key={p.inventory_id}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Image
                  src={p.image_url}
                  alt={p.name}
                  style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '10px' }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{p.name}</h3>
                <p style={{ color: '#FF7F32' }}>Rp {p.price}</p>
                <p style={{ color: '#888' }}>Stock: {p.stock}</p>
                <Link href={`/buyer/${p.inventory_id}`}>
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#40E0D0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '10px',
                    }}
                  >
                    Lihat Detail
                  </button>
                </Link>
              </div>
            ))}
          {products.filter(p => p.name?.toLowerCase().includes(search.trim().toLowerCase())).length === 0 && (
            <p style={{ textAlign: 'center', color: '#888', gridColumn: '1 / -1' }}>
              Tidak ada produk ditemukan
            </p>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div style={{ marginTop: '20px' }}>
          {orders.length > 0 ? orders.map(o => (
            <div
              key={o.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                marginBottom: '15px'
              }}
            >
              <p style={{ color: '#888' }}><b>Seller:</b> {o.seller?.name}</p>
              <p style={{ color: '#888' }}><b>Status:</b> {o.status}</p>
              {o.order_items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    color: '#888'
                  }}
                >
                  <Image
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    width="50"
                    style={{ marginRight: '10px' }}
                  />
                  <span>
                    {item.product?.name} x {item.quantity} - Rp {item.price}
                  </span>
                </div>
              ))}
            </div>
          )) : (
            <p>Tidak ada pesanan</p>
          )}
        </div>
      )}
    </div>
  )

}
