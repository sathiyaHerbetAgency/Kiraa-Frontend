'use client'
import { Separator } from "@/components/ui/separator";
import { CreateInvoice } from './../components/Invoice/CreateInvoice';
import ListInvoice from './../components/Invoice/ListInvoice';
import MaxWidthWrapper from './../components/MaxWidthWapper/MaxWidthWrapper';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    
    <MaxWidthWrapper>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Invoice Manger</h3>
        <CreateInvoice/>
      </div>
      <Separator className="my-2 border-b-[2px] border-color-light-blue" />
      <ListInvoice />
    </MaxWidthWrapper>
  );
}
