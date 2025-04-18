'use client'
import React,{useEffect} from 'react'

import Dashboard from './../../../components/MainInvoice/Dashboard/Dashboard';
import MaxWidthWrapper from './../../../components/MaxWidthWapper/MaxWidthWrapper';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function page() {
  const router = useRouter();

useEffect(() => {
  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);
  return (
    <MaxWidthWrapper>
    <Dashboard />
    </MaxWidthWrapper>
  )
}
