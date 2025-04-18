'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

    export default function ClientsTable({ data}) {
      const router = useRouter();
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    }
    function formatDate(isoDate) {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      }).format(date);
    }
    function navigate(data){
      router.push(`Invoice/${data.clientId}`);
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">Client Id</th>
              <th className="py-3 px-4 text-left">Customers</th>
              <th className="py-3 px-4 text-center">Invoices</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-right">Last Invoiced</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((client, index) => (
              <tr onClick={()=>{navigate(client)}} key={index} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4 text-left">{client.clientId}</td>
                <td className="py-3 px-4 text-left font-medium">{client.clientName}</td>
                <td className="py-3 px-4 text-center">{client.totalInvoices}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(client.totalAmount)}</td>
                <td className="py-3 px-4 text-right">{formatDate(client.lastInvoiced)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  