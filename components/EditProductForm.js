// import { useState } from 'react'

// export default function EditProductForm({ product, onCancel, onSave }) {
//   const [form, setForm] = useState({
//     name: product.name || '',
//     image_url: product.image_url || '',
//     description: product.description || '',
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSave(form)
//   }

//   return (
//     <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
//       <h3>Edit Produk</h3>

//       <label>
//         Nama Produk:
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Nama Produk"
//         />
//       </label>

//       <label>
//         URL Gambar:
//         <input
//           name="image_url"
//           value={form.image_url}
//           onChange={handleChange}
//           placeholder="https://..."
//         />
//       </label>

//       <label>
//         Deskripsi:
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Deskripsi produk"
//         />
//       </label>

//       <button type="submit">Simpan</button>
//       <button type="button" onClick={onCancel} style={{ marginLeft: '1rem' }}>
//         Batal
//       </button>
//     </form>
//   )
// }
