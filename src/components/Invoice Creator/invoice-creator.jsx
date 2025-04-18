"use client"

import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { InvoiceDetails } from "./invoice/invoice-details"
import { ItemsForm } from "./invoice/items-form"
import { InvoicePreview } from "./invoice/invoice-preview"
import {
  calculateSubTotal,
  calculateTaxAmount,
  calculateTotal,
  generatePDF,
  generateUniqueId,
  generateInvoiceNumber,
} from "./lib/invoice-utils"
import { CustomerDialog } from './invoice/customer-dialog';
import { CustomerForm } from '@/components/Invoice Creator/invoice/customer-form';
import { v4 as uuidv4 } from 'uuid';
import {  toast } from 'react-toastify';
import { ClientSave,ClientDatas } from './../../Api/ClientApi/Api';
import { InvoiceSave } from './../../Api/InvoiceApi/Api';

import { Plus, X } from "lucide-react"
const initialData = {
  customer: {
    client_name: "Hitman Sdn Bhd",
    client_email: "billing@hitman.group",
    client_address: "11A Jalan Kelawang, 11/4B 40100 Shah Alam, Selangor",
  },
  invoice: {
    number: generateInvoiceNumber(),
    currency: "MYR",
    date: new Date("2024-02-17"),
    dueDate: new Date("2024-02-18"),
    ref: "PO/MAL/24",
    interestOfLatePayment: "",
    paymentTerms: "",
  },
  items: [
    {
      id:generateUniqueId(),
      description: "Retainer for October",
      unitPrice: 1750,
      quantity: 2,
      amount: 3500,
      tax:null,
    },
  ],
  notes: "",
}

export default function InvoiceCreator() {
  const [data, setData] = useState(initialData)
  const [clientData, setClientData] = useState()
  const [selectedCustomer,setSelectedCustomer]=useState()
  const [taxes, setTaxes] = useState([
    { name: "SST", percentage: 6 },
    { name: "GST", percentage: 10 },
  ])

  useEffect( ()=>{
    const fetchData = async () => {
      try {
        const response=await ClientDatas();
        setClientData(response.data); // Update state with fetched data
      } catch (err) {
      console.log(err)
      }
    };

    fetchData();
   
  },[])

  const generateFourDigitId = () => {
    const uuid = uuidv4(); // Generate a full UUID
    return uuid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5); // Remove dashes and slice the first 4 characters
  };

  const handleAddCustomer = async (customerData) => {
    setData({ ...data, customer: customerData })
    console.log(customerData)
    const {name, email, address}=customerData
    const clientdata={
      client_name:name,
      client_email:email,
      client_address:address,
      client_id:generateFourDigitId(),
    }
    
        const res=await ClientSave(clientdata)
      if(res?.status===200){
        // onAddOrUpdate(data);
        toast.success("Successfully Submited")
        setClientData((prevData) => [...prevData, res.data])
      }else{
        toast.error("EmailId already exists")
      }
  }
  
  const handleAddTax = (newTax) => {
    setTaxes([...taxes, newTax])
  }


  const handleSaveDraft = async () => {
    const draftData = {
      client_ref:selectedCustomer.client_id,
       // Replace with actual user ID
      inv_id:data.invoice.number,
      currency: data.invoice.currency,
      inv_date_issued: data.invoice.date,
      inv_due_date: data.invoice.dueDate,
      ref_number: data.invoice.ref,
      items: data.items.map((item) => ({
        item_id: item.id,
        description: item.description,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        amount: item.amount,
        tax:item.tax,
        discount:item.discount
      })),
      inv_subtotal: calculateSubTotal(data.items),
      inv_tax_amount: calculateTaxAmount(data.items, taxes),
      inv_total_amount: calculateTotal(data.items,taxes),
      inv_status: "Pending",
    }
    try {
      console.log(draftData)
      const res = await InvoiceSave(draftData);
      const { status, data } = res || {};
      if (status !== 200) {
        toast.error("Error: Please Try Again");
        return;
      }
      toast.warning("Draft Saved");
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Error: Please Try Again");
    }
    

  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById("invoice-preview")

    // Add a temporary class to ensure proper rendering
    element.classList.add("pdf-export")

    try {
      const pdf = await generatePDF(element)
      pdf.save("invoice.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      element.classList.remove("pdf-export")
    }
  }

  return (
    <div className=" py-8 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice Generator</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save as draft
          </Button>
          <Button onClick={handleDownloadPDF}>Send Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8">
        {/* Left Side - Form */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Invoice Details</h2>
            <div className="flex space-x-2 text-sm">
              <span className="text-muted-foreground">Quotation</span>
              <span className="font-medium">|</span>
              <span className="font-medium">Invoice</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Customer</h3>
            <CustomerDialog onAddCustomer={handleAddCustomer} />
          </div>

          <CustomerForm customers={clientData} customer={selectedCustomer} onChange={(customer) =>{ setSelectedCustomer(customer ); setData({ ...data, customer }) } } />

          <Separator />

          <InvoiceDetails invoice={data.invoice}  onChange={(invoice) => setData({ ...data, invoice })} />

          <Separator />

          <ItemsForm
            items={data.items}
            currency={data.invoice.currency}
            taxes={taxes}
            onCurrencyChange={(currency) =>
              setData({
                ...data,
                invoice: { ...data.invoice, currency },
              })
            }
            onAddTax={handleAddTax}
            onChange={(items) => setData({ ...data, items })}
          />

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              placeholder="Add any additional notes here..."
              rows={4}
            />
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="pr-8" id="invoice-preview">
          <InvoicePreview data={data} taxes={taxes} />
        </div>
      </div>
    </div>
  )
}

