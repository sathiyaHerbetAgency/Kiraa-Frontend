import InvoiceCard from "./InvoiceCard"

export default function BoardView({ invoices }) {
  // Group invoices by status
  const groupedInvoices = invoices?.reduce((acc, invoice) => {
    if (!acc[invoice.status]) {
      acc[invoice.status] = []
    }
    acc[invoice.status].push(invoice)
    return acc
  }, {})

  // Define the columns in the order we want them
  const columns = [
    { id: "Draft", title: "Draft" },
    { id: "Todo", title: "Todo" },
    { id: "In Progress", title: "In Progress" },
    { id: "Done", title: "Done" },
    { id: "Overdue", title: "Overdue" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {columns?.map((column) => (
        <div key={column.id} className="bg-gray-50 rounded-md p-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">{column.title}</h3>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {(groupedInvoices[column?.id] || []).length}
            </span>
          </div>

          <div className="space-y-3">
            {(groupedInvoices[column.id] || []).map((invoice) => (
              <InvoiceCard key={`${invoice.invoiceNo}-${invoice.id}`} invoice={invoice} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

