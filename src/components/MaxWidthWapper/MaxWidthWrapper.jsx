'use client'
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const MaxWidthWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
useEffect(() => {

  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768);
  };
  const token = Cookies.get("token");
  console.log(token)
  if (!token) {
    router.push("/login");
  }
  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);

}, [router]);
  return (
    <>
    {isMobile && (
        <div className="blur-overlay">
          This site is only available on desktop. Please visit on a larger screen.
        </div>
      )}
    <div className="flex pt-[30px] px-8">
      <main className="flex-1 w-full pt-[40px] min-h-[82vh] lg:ml-72">
        {children}
      </main>
    </div>
    </>
  );
};

export default MaxWidthWrapper;
