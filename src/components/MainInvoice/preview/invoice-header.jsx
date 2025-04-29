export function InvoiceHeader({ invoice }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Invoice {invoice.number}</h1>
      <p className="text-gray-500">{invoice.date}</p>
    </div>
  )
}
