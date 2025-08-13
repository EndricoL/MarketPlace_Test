export default function SellerInventoryList({ inventory }) {
  return (
    <section>
      <h2>Produk yang Dijual</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            <strong>{item.products.name}</strong> — Rp{item.price} — Stok: {item.stock}
            <br />
            <img src={item.products.image_url} alt={item.products.name} width="100" />
          </li>
        ))}
      </ul>
    </section>
  )
}
