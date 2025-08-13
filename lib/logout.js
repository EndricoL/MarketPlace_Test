export async function handleLogout() {
  try {
    // Panggil API logout
    await fetch('/api/logout', { method: 'POST' })

    // Bersihkan localStorage & sessionStorage
    localStorage.clear()
    sessionStorage.clear()

    // Redirect ke halaman login
    window.location.href = '/login'
  } catch (err) {
    alert('Gagal logout: ' + err.message)
  }
}
