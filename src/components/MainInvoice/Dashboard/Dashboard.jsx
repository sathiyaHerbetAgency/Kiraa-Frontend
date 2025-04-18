/* eslint-disable */
"use client"

import { useState,useEffect } from "react"
import MetricCard from "@/components/ui/metric-card"
// import ClientsTable from "@/clients/clients-table"
import ActivityFeed from "./Component/activity/activity-feed"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import ViewToggle from "@/components/ui/view-toggle"
import FilterButton from "@/components/ui/filter-button"
import SortButton from "@/components/ui/sort-button"
import ClientsTable from './Component/Clients/clients-table';
import Link from "next/link"
import { InvoiceSummary } from './../../../Api/InvoiceApi/Api';

export default function Dashboard() {
  const [viewType, setViewType] = useState("list")
  const [clientsData, setClientsData]=useState(null)
  useEffect(() => {
    let isMounted = true;
  
    (async () => {
      try {
        const response = await InvoiceSummary();
        if (isMounted) {
          console.log(response.data); // Log fetched data
          setClientsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching invoice summary:", error);
      }
    })();
  
    return () => {
      isMounted = false;
    };
  }, []);

// Outputs: "17 February 2024"
  
  const metricsData = [
    {
      title: "Invoiced",
      value: "59,287",
      subtitle: "429 invoices",
      color: "black",
      mtd: true,
    },
    {
      title: "Total Paid",
      value: "10,432",
      subtitle: "18 invoices",
      color: "green",
      mtd: true,
    },
    {
      title: "Total Income",
      value: "7,321",
      subtitle: "6 invoices",
      color: "red",
      mtd: true,
    },
    {
      title: "Pending",
      value: "7,321",
      subtitle: "3 invoices",
      color: "yellow",
      mtd: true,
    },
    {
      title: "Clients",
      value: "20",
      subtitle: "",
      color: "purple",
      mtd: false,
    },
  ]

  // const clientsData = [
  //   { invNumber: "INV-0124", customer: "Hitman Sdn Bhd", invoices: 25, amount: 10500, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Autolavn", invoices: 30, amount: 2154, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Fatima", invoices: 20, amount: 3500, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Santus", invoices: 15, amount: 3500, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Glass Pro", invoices: 10, amount: 3500, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Top Clove", invoices: 11, amount: 1900, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Emico", invoices: 14, amount: 2000, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Pepsi", invoices: 37, amount: 3000, lastInvoiced: "10/02/2025" },
  //   { invNumber: "INV-0124", customer: "Ghee", invoices: 28, amount: 2000, lastInvoiced: "10/02/2025" },
  // ]

  const activitiesData = [
    {
      id: 1,
      user: { name: "Amir Norman", avatar: "/placeholder.svg?height=40&width=40" },
      action: "created",
      subject: "Invoice PO-4491",
      time: "1hr ago",
    },
    {
      id: 2,
      subject: "Invoice JL-34328",
      action: "was sent to",
      target: "Chester Corp",
      time: "2hrs ago",
    },
    {
      id: 3,
      subject: "Invoice SP-3122",
      action: "was sent to",
      target: "Hitman Corp",
      time: "Yesterday, 3:30PM",
    },
    {
      id: 4,
      user: { name: "Amir Norman", avatar: "/placeholder.svg?height=40&width=40" },
      action: "edited",
      subject: "Invoice SP-3122",
      time: "Yesterday, 4:15PM",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Clients</h2>
              </div>

              <div className="flex items-center justify-between mb-4">
                <ViewToggle activeView={viewType} onViewChange={setViewType} />
                <Link href='/Create-Invoice'>
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                    <span className="text-lg">+</span>
                    Create New Invoice
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <FilterButton />
                  <SortButton />
                </div>
              </div>
            <ClientsTable data={clientsData}/>
            </section>
          </div>

          <div>
            <section>
              <h2 className="text-2xl font-bold mb-4">Activities</h2>
              <ActivityFeed activities={activitiesData} />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

