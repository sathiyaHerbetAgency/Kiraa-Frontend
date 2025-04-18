"use client"

import { useState, useEffect } from "react"
import Header from "./../../../../components/IndividualInvoice/Components/Header"
import ListView from "./../../../../components/IndividualInvoice/Components/ListView"
import TabNavigation from "./../../../../components/IndividualInvoice/Components/TabNavigation"
import BoardView from './../../../../components/IndividualInvoice/Components/BoardView';
import MaxWidthWrapper from './../../../../components/MaxWidthWapper/MaxWidthWrapper';
import { IndividualClientData } from './../../../../Api/ClientApi/Api';
import { usePathname } from 'next/navigation';
import { IndividualInvoiceData,InvoiceDatas } from './../../../../Api/InvoiceApi/Api';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
export default function page() {
  const [activeTab, setActiveTab] = useState("board")
  const [searchQuery, setSearchQuery] = useState("")
  const [invoices, setInvoices] = useState([])
  const pathname = usePathname()
  const router = useRouter();

useEffect(() => {
  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);
  const filteredInvoices = invoices?.filter((invoice) =>
    invoice.inv_id.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  useEffect(() => {
    let isMounted = true;
    const id=pathname.split('/').pop();
    (async () => {
      try {
        const response = await InvoiceDatas(id)
        if (isMounted) {
          console.log(response.data); // Log fetched data
          setInvoices(response.data);
        }
      } catch (error) {
        console.error("Error fetching invoice summary:", error);
      }
    })();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MaxWidthWrapper>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Header title="Hitman Sdn Bhd" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="mt-4">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "board" ? <BoardView invoices={filteredInvoices} /> : <ListView invoices={filteredInvoices} />}
          </div>
        </div>
      </main>
    </MaxWidthWrapper>
  )
}

