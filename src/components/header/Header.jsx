// components/header/Header.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Bell, Clock as ClockIcon, HelpCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // or replace with <img>
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Loading from './../Loading/page';
export default function Header() {
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
    <header
      className="
        fixed top-0 left-0
        z-0
        flex h-14 w-full items-center
        border-b bg-white
        px-4
              /* push content right of sidebar */
      "
    >
      <div className="text-xl font-semibold text-black">
        Kiraa....
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <ClockIcon className="h-5 w-5" />
          <span className="sr-only">Recent</span>
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        {/* if you don’t have Avatar files, swap this for a simple <img>: */}
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User" className="h-8 w-8" />
          <AvatarFallback className="h-8 w-8">AN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
