import { useState } from "react"
import { deleteProduct, updateProduct } from "@/lib/api"

export default function ProductList({ products, onRefresh }) {
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState({name: '', image_url: '',description: ''})

  const handleEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      image_url: product.image_url,
      description: product.description
    })
  }

  const handleCancel = () => {
    setEditProduct(null)
    setForm({name: '', image_url: '', description: ''})
  }

  const handleSave = async () => {
    await updateProduct(editProduct.id, form)
    setEditProduct(null)
    onRefresh()
  }
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Yakin akan menghapus ini?')
    if(confirmed){
        await deleteProduct(id)
        onRefresh()
    }
  }

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    // <section>
    //   <h2>Daftar Produk</h2>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.id}>
    //         {editProduct?.id === product.id ? (
    //           <div>
    //             <input
    //               name="name"
    //               value={form.name}
    //               onChange={handleChange}
    //               placeholder="Nama Produk"
    //             />
    //             <input
    //               name="image_url"
    //               value={form.image_url}
    //               onChange={handleChange}
    //               placeholder="URL Gambar"
    //             />
    //             <textarea
    //               name="description"
    //               value={form.description}
    //               onChange={handleChange}
    //               placeholder="Deskripsi"
    //             />
    //             <button onClick={handleSave}>Simpan</button>
    //             <button onClick={handleCancel}>Batal</button>
    //           </div>
    //         ) : (
    //           <div>
    //             <strong>{product.name}</strong> — {product.description}
    //             <br />
    //             <img src={product.image_url} alt={product.name} width="100" />
    //             <br />
    //             <button onClick={() => handleEdit(product)}>Edit</button>
    //             <button onClick={() => handleDelete(product.id)}>Hapus</button>
    //           </div>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </section>
    <section style={{ padding: '20px' }}>
  <h2 style={{ fontSize: '24px', color: '#fff' }}>Daftar Produk</h2>
  <ul
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)', // 7 kolom
      gap: '15px', // Menyesuaikan jarak antar item
      listStyleType: 'none',
      padding: 0,
    }}
  >
    {products.map((product) => (
      <li
        key={product.id}
        style={{
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
      >
        {editProduct?.id === product.id ? (
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Produk"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #fff',
                backgroundColor: '#f0f0f0',
                color: '#333',
              }}
            />
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="URL Gambar"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #fff',
                backgroundColor: '#f0f0f0',
                color: '#333',
              }}
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #fff',
                backgroundColor: '#f0f0f0',
                color: '#333',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF7F32',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Simpan
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div>
            <strong style={{ fontSize: '18px', color: '#fff' }}>{product.name}</strong>
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: '100%', // Semua gambar akan memiliki ukuran yang sama
                height: 'auto',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '10px' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
              <button
                onClick={() => handleEdit(product)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007BFF', // Biru untuk edit
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF4136', // Merah untuk hapus
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
</section>

  )
}
