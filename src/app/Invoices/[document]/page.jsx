/* eslint-disable */
'use client'
import React, {useEffect,useState} from 'react'
import { InvoiceDatas,IndividualInvoiceData } from './../../../Api/InvoiceApi/Api';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from './../../../components/MaxWidthWapper/MaxWidthWrapper';
import InvoiceHeader from './../../../components/InvoiceDashboard/InvoiceHeader';
// import EditableText1 from './../../../components/InvoiceDashboard/EditableText';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditInvoice } from './../../../components/InvoiceDashboard/InvoiceForm/EditInvoice';
import { IndividualClientData } from './../../../Api/ClientApi/Api';

const ClientDashboard = () => {
  const [data, setData] = useState([]);
  const [clientData, setclientData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()
  const router = useRouter();
console.log("id")
  useEffect( ()=>{

    const fetchData = async () => {
      
      try {
        setLoading(true); // Set loading to true before API call
        const id=pathname.split('/').pop();
        const response=await IndividualInvoiceData(id);
        setData(response.data[0]); // Update state with fetched data      
      } catch (err) {
        setError(err.message); // Capture and set the error
      } finally {
        setLoading(false); // Set loading to false after the call
      }
    };
    fetchData()
    
  },[])
  const handleAddOrUpdate = (newItem) => {
    // Append new data locally
    setData((prevData) => [...prevData, newItem]);
  }
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
   
  return (
    <>
      <MaxWidthWrapper>
        <InvoiceHeader onAddOrUpdate={handleAddOrUpdate} data={data} />
        {/* <div className="flex flex-col">
        <Input type="email" placeholder="Email" />
        </div>
         */}
         <EditInvoice data={data}  />
      </MaxWidthWrapper>
    </>
  )
}

export default ClientDashboard