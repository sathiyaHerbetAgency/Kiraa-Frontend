export function InvoiceDetails({ invoice }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
        <p className="text-sm">{invoice.customer.address}</p>

        <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Email</h3>
        <p className="text-sm">{invoice.customer.email}</p>

        <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Phone</h3>
        <p className="text-sm">{invoice.customer.phone}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
            {invoice.dueDate}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {invoice.status}
          </span>
        </div>
      </div>
    </div>
  )
}
