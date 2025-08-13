export async function fetchProducts() {
  const res = await fetch('/api/products')
  return await res.json()
}

export async function createProduct(data) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Gagal menyimpan produk: ${res.status}`)
  }

  return await res.json()
}

export async function updateProduct(id, data) {
  await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteProduct(id) {
  await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
}

export async function fetchSellerProducts(sellerId) {
  const res = await fetch(`/api/seller-products?seller_id=${sellerId}`)
  if (!res.ok) {
    throw new Error(`Gagal mengambil produk seller: ${res.status}`)
  }
  return await res.json()
}

