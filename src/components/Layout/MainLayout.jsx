// components/layout/MainLayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from './sidebar';

export default function MainLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <>
      {!isLogin && <Sidebar />}
      {!isLogin && <Header />}
      

      {/* 
        pt-14  → push below the fixed 3.5rem (14) header  
        md:pl-64 → push right of the 16rem (64) sidebar on md+ screens 
      */}
      <main className={`${!isLogin ? "pt-14 md:pl-64" : ""}`}>
        {children}
      </main>

      {!isLogin && (
        <footer className="bg-white pt-4 md:pl-64">
          <Footer />
        </footer>
      )}
    </>
  );
}
