/* eslint-disable */
'use client'
import { Separator } from "@/components/ui/separator";
import { CreateInvoice } from './../components/Invoice/CreateInvoice';
import ListInvoice from './../components/Invoice/ListInvoice';
import MaxWidthWrapper from './../components/MaxWidthWapper/MaxWidthWrapper';
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

import Dashboard from './../components/MainInvoice/Dashboard/Dashboard';
export default function Home() {
  const router = useRouter();
  
const [isMobile, setIsMobile] = useState(false);



  useEffect(() => {
    // const checkScreen = () => {
    //   setIsMobile(window.innerWidth < 768);
    // };
  
    // checkScreen();
    // window.addEventListener('resize', checkScreen);
    // return () => window.removeEventListener('resize', checkScreen);
    const token = Cookies.get("token");
    console.log(token)
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    
    <MaxWidthWrapper>
        <Dashboard />
      {/* <div className="flex justify-between mt-8">
        <h3 className="text-2xl font-semibold">Invoice Manger</h3>
        <CreateInvoice/>
      </div>
      <Separator className="my-2 border-b-[2px] border-color-light-blue" />
      <ListInvoice /> */}
    </MaxWidthWrapper>
  );
}
