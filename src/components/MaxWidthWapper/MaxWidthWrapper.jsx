'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Loading from './../Loading/page';
const MaxWidthWrapper = ({ children }) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [checked, setChecked] = useState(false)   // ← have we verified auth yet?

  useEffect(() => {
    // 1️⃣ Check auth
    const token = Cookies.get('token')
    if (!token) {
      // use replace so user can’t “back” into a protected page
      router.replace('/login')
      return
    }
    setChecked(true)

    // 2️⃣ Set up your resize listener
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [router])

  // While we’re waiting for the token-check, render nothing (or a spinner)
  if (!checked) return <Loading />

  return (
    <>
      {isMobile && (
        <div className="blur-overlay">
          This site is only available on desktop. Please visit on a larger screen.
        </div>
      )}
      <div className="flex pt-[30px] px-8">
        <main className="flex-1 w-full min-h-[82vh] ">
          {children}
        </main>
      </div>
    </>
  )
}

export default MaxWidthWrapper
