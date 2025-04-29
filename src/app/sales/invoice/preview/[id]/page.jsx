"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { InvoiceHeader } from "@/components/MainInvoice/preview/invoice-header"
import { InvoiceDetails } from "@/components/MainInvoice/preview/invoice-details"
import { InvoiceItems } from "@/components/MainInvoice/preview/invoice-items"
import { InvoiceTotals } from "@/components/MainInvoice/preview/invoice-totals"
import { InvoiceActions } from "@/components/MainInvoice/preview/invoice-actions"
import { InvoiceAttachments } from "@/components/MainInvoice/preview/invoice-attachments"
import { ActivityTimeline } from "@/components/MainInvoice/preview/activity-timeline"

import { generatePDF } from "@/lib/invoice-utils"
import { IndividualInvoiceData } from "@/Api/InvoiceApi/Api"  // adjust to your actual import

export default function InvoicePreviewPage() {
  const pathname = usePathname()
  const id = pathname.split("/").pop()

  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (!id) {
      console.warn("InvoicePreviewPage: no id in pathname yet, skipping fetch")
      setLoading(false)
      return
    }

    async function fetchInvoice() {
      try {
        const response = await IndividualInvoiceData(id)
        const raw = response.data
        if (!isMounted || !raw) return
        // safe getters
        const getNum = (x) =>
          typeof x === "object" && Object.values(x).length
            ? Number(Object.values(x)[0])
            : Number(x) || 0

        const fmtDate = (ms) =>
          ms
            ? new Date(ms).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : ""

        const fmtDateTime = (ms) =>
          ms
            ? new Date(ms).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })
            : ""

        const issuedMs = raw.inv_date_issued?.$date?.$numberLong
          ? +raw.inv_date_issued.$date.$numberLong
          : undefined

        const dueMs = raw.inv_due_date?.$date?.$numberLong
          ? +raw.inv_due_date.$date.$numberLong
          : undefined

        const formatted = {
          id: raw.inv_id,
          number: raw.inv_id,
          date: fmtDateTime(issuedMs),
          dueDate: fmtDate(dueMs),
          status: raw.inv_status,
          customer: {
            name: raw.client_name ?? raw.client_ref,
            address: raw.client_address ?? "",
            email: raw.client_email ?? "",
            phone: raw.client_phone ?? "",
          },
          items: Array.isArray(raw.items)
            ? raw.items.map((itm) => ({
                description: itm.description,
                price: getNum(itm.unit_price),
                qty: getNum(itm.quantity),
                discount: itm.discount_percent ?? "0%",
                tax: itm.tax_percent ?? "0%",
                amount: getNum(itm.amount),
              }))
            : [],
          totals: {
            subtotal: getNum(raw.inv_subtotal),
            discount: raw.inv_discount_amount
              ? `-${getNum(raw.inv_discount_amount)}`
              : "-",
            tax: raw.inv_tax_amount
              ? `${getNum(raw.inv_tax_amount)}`
              : "0%",
            total: getNum(raw.inv_total_amount),
            totalInWords: raw.inv_total_in_words ?? "",
          },
          attachments: Array.isArray(raw.attachments)
            ? raw.attachments
            : [],
          activities: Array.isArray(raw.activities)
            ? raw.activities
            : [],
        }

        console.log("→ mapped invoice:", formatted)
        setInvoice(formatted)
      } catch (err) {
        console.error("Error fetching/mapping invoice:", err.message ?? err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchInvoice()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleDownloadInvoice = async () => {
    setIsGeneratingPDF(true)
    const element = document.getElementById("invoice-for-pdf")

    try {
      const pdf = await generatePDF(element)
      pdf.save(`Invoice-${invoice.number}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading…
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div id="invoice-for-pdf" className="bg-white rounded-lg shadow-sm p-6">
            <InvoiceHeader invoice={invoice} />
            <InvoiceDetails invoice={invoice} />
            <InvoiceItems items={invoice.items} />
            <InvoiceTotals totals={invoice.totals} />
            <InvoiceActions
              onDownload={handleDownloadInvoice}
              isGeneratingPDF={isGeneratingPDF}
            />
          </div>
          <div className="mt-6">
            <InvoiceAttachments attachments={invoice.attachments} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityTimeline activities={invoice.activities} />
        </div>
      </div>
    </div>
  )
}
