"use client"

import { format } from "date-fns"
import { calculateSubTotal, calculateTaxAmount, calculateTotal } from "../lib/invoice-utils"

export function InvoicePreview({ data, taxes }) {
  const { customer, invoice, items, notes } = data
  console.log(data)

  // Calculate totals
  const subtotal = calculateSubTotal(items)
  const taxAmount = calculateTaxAmount(items, taxes)
  const total = calculateTotal(items, taxes)

  // Find applied taxes
  const appliedTaxes = []
  items.forEach((item) => {
    if (item.tax) {
      const tax = taxes?.find((t) => t.name === item.tax)
      if (tax && !appliedTaxes.some((t) => t.name === tax.name)) {
        appliedTaxes.push(tax)
      }
    }
  })

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      {/* Company Logo/Name */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 bg-red-700" />
        <h1 className="text-xl font-medium">Your Company Name</h1>
      </div>

      {/* Invoice Title */}
      <h2 className="text-2xl font-medium mb-8">Invoice</h2>

      {/* Invoice and Customer Details */}
      <div className="grid grid-cols-2 gap-y-2 mb-12">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Invoice No.</div>
          <div>{invoice?.number}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Issued To</div>
          <div>{customer.client_name}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-500">Currency</div>
          <div>{invoice.currency}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Email</div>
          <div>{customer.client_email}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-500">Date</div>
          <div>{invoice.date ? format(invoice.date, "dd/MM/yyyy") : ""}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Address</div>
          <div>{customer.client_address}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-500">Due Date</div>
          <div>{invoice.dueDate ? format(invoice.dueDate, "dd/MM/yyyy") : ""}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-500">Ref</div>
          <div>{invoice.ref}</div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-12">
        <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-lg text-sm">
          <div className="col-span-2">Items</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2 text-right">Unit Price</div>
          <div className="col-span-1 text-center">QTY</div>
          <div className="col-span-1 text-center">Discount</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b text-sm">
            <div className="col-span-2">{item.id}</div>
            <div className="col-span-4">{item.description}</div>
            <div className="col-span-2 text-right">{item.unitPrice.toLocaleString()}</div>
            <div className="col-span-1 text-center">{item.quantity}</div>
            <div className="col-span-1 text-center">{item.discount ? `${item.discount}%` : "-"}</div>
            <div className="col-span-2 text-right">{item.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="w-1/2 ml-auto space-y-2">
        <div className="flex justify-between">
          <div className="text-gray-500">Sub Total</div>
          <div>{subtotal.toLocaleString()}</div>
        </div>

        {appliedTaxes.map((tax, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-gray-500">
              {tax.name} ({tax.percentage}%)
            </div>
            <div>{(subtotal * (tax.percentage / 100)).toLocaleString()}</div>
          </div>
        ))}

        <div className="flex justify-between pt-2 border-t font-medium">
          <div>Total Amount</div>
          <div>{total.toLocaleString()}</div>
        </div>
      </div>

      {/* Repeated Invoice Details */}
      <div className="mt-20 pt-8 border-t text-sm space-y-2">
        <div className="grid grid-cols-2 gap-y-2">
          <div className="space-y-1">
            <div className="text-gray-500">Invoice No.</div>
            <div>{invoice.number}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Currency</div>
            <div>{invoice.currency}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Date</div>
            <div>{invoice.date ? format(invoice.date, "dd/MM/yyyy") : ""}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Due Date</div>
            <div>{invoice.dueDate ? format(invoice.dueDate, "dd/MM/yyyy") : ""}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Ref</div>
            <div>{invoice.ref}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-right text-gray-400">Invoice powered by Kiraa</div>
    </div>
  )
}

