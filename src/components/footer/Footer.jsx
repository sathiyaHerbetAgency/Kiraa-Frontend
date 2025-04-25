"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const [checked, setChecked] = useState(false)   // ← have we verified auth yet?
  const router = useRouter()
  useEffect(() => {
    // 1️⃣ Check auth
    const token = Cookies.get('token')
    if (!token) {
      // use replace so user can’t “back” into a protected page
      router.replace('/login')
      return
    }
    setChecked(true)
  }, [router])

  // While we’re waiting for the token-check, render nothing (or a spinner)
  if (!checked) return null
  return (
    <>
     <Separator className="border-[#000] border-t-2" />
    <footer className=" h-14 --center-all">
     
      <div className="container flex-center">
        <p className="text-sm text-black">
          © Kirakira - All Rights Reserved
        </p>
      </div>
    </footer>
    </>
  );
}
