'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Login gagal')
        return
      }

      setMessage('')

      // Simpan seller_id kalau role seller
      if (data.user.role === 'seller') {
        localStorage.setItem('seller_id', data.user.id)
        localStorage.setItem('seller_name', data.user.name)
        setTimeout(() => {
          window.location.href = '/seller'
        }, 100)
      } else if (data.user.role === 'buyer') {
        localStorage.setItem('buyer_id', data.user.id)
        localStorage.setItem('buyer_name', data.user.name)
        window.location.href = '/buyer'
      } else if (data.user.role === 'admin') {
        window.location.href = '/admin'
      } else {
        setMessage('Role tidak dikenali')
      }

    } catch (err) {
      console.error(err)
      setMessage('Terjadi kesalahan server')
    }
  }

  return (
    // <div style={{ padding: '20px' }}>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Email: </label>
    //       <input type="email" name="email" value={formData.email} onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>Password: </label>
    //       <input type="password" name="password" value={formData.password} onChange={handleChange} />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>

    //   {message && <p>{message}</p>}
    // </div>
    <div style={{
      padding: '40px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      border: '2px solid #40E0D0', // Border turquoise
      maxWidth: '400px',
      margin: '50px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
    <h1 style={{ 
      textAlign: 'center', 
      color: '#333', 
      fontWeight: 'bold',  // Bold text
      fontSize: '28px',    // Lebih besar
      marginBottom: '20px' 
    }}>
      Login
    </h1>
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Email: </label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            marginTop: '5px',
            color: '#333'
          }} 
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Password: </label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            marginTop: '5px',
            color: '#333'
          }} 
        />
      </div>
      <button 
        type="submit" 
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#40E0D0',  // Button turquoise
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }} 
        onMouseOver={(e) => e.target.style.backgroundColor = '#38B0A2'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#40E0D0'}
      >
        Login
      </button>
    </form>

    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p style={{ fontSize: '14px', color: '#555' }}>
        Don't have an account? 
        <a href="/register" style={{ color: '#40E0D0', textDecoration: 'none' }}> Register</a>
      </p>
    </div>

    {message && <p style={{ color: '#d9534f', textAlign: 'center' }}>{message}</p>}
  </div>
  )
}
