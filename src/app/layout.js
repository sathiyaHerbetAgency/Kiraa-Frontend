import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { Sidebar } from './../components/Layout/sidebar';
import MainLayoutWrapper from './../components/Layout/MainLayout';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KiraKira",
  description: "Invoice Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute">
          <ToastContainer />
        </div>
        <MainLayoutWrapper>
        {children}
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
