'use client'
import React, {useEffect} from "react";
import Link from "next/link";
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const headertext='text-[#00000080] font-[LexendDeca-500] text-[12.75px] leading-[17px]  hover:text-black'
  const active='text-[#000]  font-[LexendDeca-500] text-[12.75px] leading-[17px] hover:text-black'
  const pathname = usePathname()
  // useEffect(()=>{
  //   console.log(pathname)
  // console.log(pathname && pathname.split('/')[1] === 'Clients')
  // },[])
  return (
    <div className="fixed z-2">
    <header className=" bg-white ">
   
      <div className="container h-[70px] min-w-[100vw]  flex justify-between items-center">
        <div className="logo text-white">
          <Link href='/' className="font-[Inter-Semibold] text-black text-[22.57px] leading-[17px] hover:text-black">KiraKira</Link>
        </div>
        <nav>
          <ul className="flex items-end  gap-[79.33px]">
            <li>
              <Link href="/" className={`${ pathname==="/"?active:headertext}`}>Home</Link>
            </li>
            <li>
              <Link href="/Invoices"  className={`${ pathname==="/Invoices"?active:headertext}`}>Invoices</Link>
            </li> <li>
              <Link href="/Quotation" className={`${ pathname==="/Quotation"?active:headertext}`}>Quotation</Link>
            </li> <li>
              <Link href="/Clients" className={`${ pathname && pathname.split('/')[1] === 'Clients'?active:headertext}`}>Clients</Link>
            </li>
          </ul>
        </nav>
        <ul className="flex items-center gap-3">
           <li className="text-[16.57px] text-white leading-[16.57px] bg-[#D9D9D9] w-fit p-3 py-[0.6rem] rounded-[100%]">A</li>
           {/* <li className='text-[10.57px]'>
              <Link href="/" className="text-black  hover:text-black"> <p className="font-[Inter-Semibold] text-[#000000 text-[10.57px] leading-[12px]">Amir Norman</p></Link>
              <p className="font-[Inter-Semibold] text-[#fff] text-[10.57px] leading-[12px]">Admin</p>
            </li> */}
            <DropdownMenu>
  <DropdownMenuTrigger><li className='text-[10.57px]  items-start flex flex-col'>
              <Link href="/" className="text-black  hover:text-black"> <p className="font-[Inter-Semibold] text-[#000000 text-[10.57px] leading-[12px] self-start">Amir Norman</p></Link>
              <span className="font-[Inter-Semibold] text-black text-[10.57px] leading-[12px] ">Admin</span>
            </li> </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          </ul>
      </div>
      <Separator  className="my-2 border-b-[2px] border-[#000]" />
     
    </header>
    </div>
  );
}
