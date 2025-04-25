// useRequireAuth.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function useRequireAuth() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.replace('/login')
    } else {
      setChecked(true)
    }
  }, [router])

  return checked
}
