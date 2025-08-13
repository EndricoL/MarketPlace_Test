'use client'

import { useEffect, useState } from 'react'
import ProductForm from '@/components/ProductForm'
import ProductList from '@/components/ProductList'
import { fetchProducts } from '@/lib/api'
import { handleLogout } from '@/lib/logout'

export default function AdminPage(){
    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        const data = await fetchProducts()
        setProducts(data)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
    // <main style={{ padding: '2rem', minHeight: '100vh' }}>
    //   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
    //     <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
    //       Halaman Admin - Master Produk
    //     </h1>
    //     <button 
    //       onClick={handleLogout}
    //       style={{
    //         backgroundColor: '#FF4C4C',
    //         color: '#fff',
    //         padding: '10px 20px',
    //         border: 'none',
    //         borderRadius: '8px',
    //         cursor: 'pointer',
    //         fontSize: '14px',
    //         fontWeight: 'bold',
    //         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    //         transition: 'background-color 0.3s ease'
    //       }}
    //       onMouseOver={e => e.currentTarget.style.backgroundColor = '#e03e3e'}
    //       onMouseOut={e => e.currentTarget.style.backgroundColor = '#FF4C4C'}
    //     >
    //       Logout
    //     </button>
    //   </div>
    //   <ProductForm onRefresh={loadProducts} />
    //   <ProductList products={products} onRefresh={loadProducts} />
    // </main>
    <main style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#000' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
      Halaman Admin - Master Produk
    </h1>
    <button 
      onClick={handleLogout}
      style={{
        backgroundColor: '#FF4C4C',
        color: '#fff',
        padding: '10px 20px',
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

  <ProductForm onRefresh={loadProducts} />
  <ProductList products={products} onRefresh={loadProducts} />
</main>

  )
}

