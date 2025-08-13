'use client'

export default function RegisterForm({ formData, onChange, onSubmit, message }) {
  return (
    // <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
    //   <h1>Register</h1>
    //   <form onSubmit={onSubmit}>
    //     <input
    //       name="name"
    //       type="text"
    //       placeholder="Nama"
    //       value={formData.name}
    //       onChange={onChange}
    //       required
    //     />
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={onChange}
    //       required
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={onChange}
    //       required
    //     />
    //     <input
    //       name="role"
    //       type="text"
    //       placeholder="Role (buyer/seller)"
    //       value={formData.role}
    //       onChange={onChange}
    //       required
    //     />
    //     <input
    //       name="phone"
    //       type="text"
    //       placeholder="Nomor Telepon"
    //       value={formData.phone}
    //       onChange={onChange}
    //       required
    //     />
    //     <input
    //       name="address"
    //       type="text"
    //       placeholder="Alamat"
    //       value={formData.address}
    //       onChange={onChange}
    //       required
    //     />
    //     <button type="submit">Register</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
    <div style={{
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #40E0D0', // Border turquoise
    maxWidth: '400px',
    margin: '50px auto', // Menempatkan border di tengah halaman
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}>
    <h1 style={{
      textAlign: 'center',
      color: '#333',
      fontWeight: 'bold',
      fontSize: '28px',
      marginBottom: '20px',
    }}>
      Register
    </h1>
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Name: </label>
        <input
          name="name"
          type="text"
          placeholder="Nama"
          value={formData.name}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Email: </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Password: </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Role (buyer/seller): </label>
        <input
          name="role"
          type="text"
          placeholder="Role (buyer/seller)"
          value={formData.role}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Phone Number: </label>
        <input
          name="phone"
          type="text"
          placeholder="Nomor Telepon"
          value={formData.phone}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>Address: </label>
        <input
          name="address"
          type="text"
          placeholder="Alamat"
          value={formData.address}
          onChange={onChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333',
            marginTop: '5px',
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
        Register
      </button>
    </form>

    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p style={{ fontSize: '14px', color: '#555' }}>
        Already have an account? 
        <a href="/login" style={{ color: '#40E0D0', textDecoration: 'none' }}> Login</a>
      </p>
    </div>

    {message && <p style={{ color: '#d9534f', textAlign: 'center' }}>{message}</p>}
  </div>
  )
}
