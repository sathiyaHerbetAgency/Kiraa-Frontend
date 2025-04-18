"use client"

import { useState,useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CustomerDialog } from "./customer-dialog"
import { CustomerForm } from "./customer-form"
import { InvoiceDetails } from "./invoice-details"
import { ItemsForm } from "./items-form"
import { InvoicePreview } from "./invoice-preview"
import { calculateSubTotal, calculateTax, calculateTotal, generatePDF,generateUniqueId } from "../lib/invoice-utils"
import { TaxDialog } from "./tax-dialog"
import { CurrencyDialog } from "./currency-dialog"
const initialData = {
  customer: {
    name: "Hitman Sdn Bhd",
    email: "billing@hitman.group",
    address: "11A Jalan Kelawang, 11/4B 40100 Shah Alam, Selangor",
  },
  invoice: {
    number: "INV-1057",
    currency: "MYR",
    date: new Date("2024-02-17"),
    dueDate: new Date("2024-02-18"),
    ref: "PO/MAL/24",
    interestOfLatePayment: "",
    paymentTerms: "",
  },
  items: [
    {
      id: generateUniqueId(),
      description: "Retainer for October",
      unitPrice: 1750,
      quantity: 2,
      amount: 3500,
    },
  ],
  notes: "",
}

export function InvoiceForm() {
  const [data, setData] = useState(initialData)
  const [taxes, setTaxes] = useState([
    { name: "SST", percentage: 6 },
    { name: "GST", percentage: 10 },
  ])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  useEffect(()=>{
    console.log("taxes")

  },[])
  const handleAddCustomer = (customerData) => {
    setData({ ...data, customer: customerData })
  }

  const handleAddTax = (newTax) => {
    setTaxes([...taxes, newTax])
  }

  const handleSaveDraft = () => {
    const draftData = {
      client_id: "dummy_user_id", // Replace with actual user ID
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
      })),
      inv_subtotal: calculateSubTotal(data.items),
      inv_tax_amount: calculateTax(data.items),
      inv_total_amount: calculateTotal(data.items),
      inv_status: "Pending",
    }

    console.log("Draft Data:", draftData)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    const element = document.getElementById("invoice-preview")

    try {
      const pdf = await generatePDF(element)
      pdf.save(`Invoice-${data.invoice.number}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice Generator</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save as draft
          </Button>
          <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? "Generating PDF..." : "Send Invoice"}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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

          <CustomerForm customer={data.customer} onChange={(customer) => setData({ ...data, customer })} />

          <Separator />

          <InvoiceDetails invoice={data.invoice} onChange={(invoice) => setData({ ...data, invoice })} />

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
        <div id="invoice-preview">
          <InvoicePreview data={data} taxes={taxes} />
        </div>
      </div>
    </div>
  )
}

