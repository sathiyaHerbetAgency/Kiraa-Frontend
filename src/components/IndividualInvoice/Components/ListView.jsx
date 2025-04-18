import StatusBadge from "./StatusBadge"

export default function ListView({ invoices }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-900 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Invoice No.
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Currency
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={`${invoice.invoiceNo}-${invoice.id}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.inv_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.inv_date_issued}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.inv_total_amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.currency}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={invoice.inv_status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.inv_due_date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <button className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Review</button>
                  <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center py-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">Download Statement</button>
      </div>
    </div>
  )
}

