import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SellerInventoryForm({ products, sellerId, onRefresh }) {
  const [selected, setSelected] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (productId, field, value) => {
    setSelected((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const inserts = Object.entries(selected).map(([productId, data]) => ({
      seller_id: sellerId,
      product_id: productId,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    }))

    const { error } = await supabase.from('seller_inventory').insert(inserts)
    if (!error) onRefresh()
    setSubmitting(false)
  }

  return (
    <section>
      <h2>Pilih Produk untuk Dijual</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <strong>{product.name}</strong>
            <br />
            <label>
              Harga:
              <input
                type="number"
                value={selected[product.id]?.price || ''}
                onChange={(e) => handleChange(product.id, 'price', e.target.value)}
              />
            </label>
            <label style={{ marginLeft: '1rem' }}>
              Stok:
              <input
                type="number"
                value={selected[product.id]?.stock || ''}
                onChange={(e) => handleChange(product.id, 'stock', e.target.value)}
              />
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={submitting}>
        Simpan ke Inventori
      </button>
    </section>
  )
}
