// 'use client'

// export default function LoginForm({ formData, onChange, onSubmit, message }) {
//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//       <h1>Login</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={onChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   )
// }