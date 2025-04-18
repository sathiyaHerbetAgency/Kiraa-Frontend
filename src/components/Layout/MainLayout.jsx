"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import { Sidebar } from "@/components/Layout/sidebar";
import Footer from "@/components/footer/Footer";

export default function MainLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  
  return (
    <>
      <div className="absolute">
        {/* ToastContainer can be here if needed */}
      </div>
      {!isLoginPage && <Header />}
      {!isLoginPage && <Sidebar />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
}
