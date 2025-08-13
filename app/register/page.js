'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterForm from '@/components/RegisterForm'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        address: ''
    })

    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      const res = await fetch('/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
      })
      const data = await res.json()
      setMessage(data.message || data.error)

      // Redirect ke halaman login
      if(res.ok){
        router.push('/login')
      }
    }

    return (
        <RegisterForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          message={message}
        />
      )

}