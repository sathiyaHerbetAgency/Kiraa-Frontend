export function InvoiceItems({ items }) {
  return (
    <div className="mb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-center">QTY</th>
              <th className="py-3 px-4 text-center">Discount</th>
              <th className="py-3 px-4 text-center">Tax</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className='text-sm bg-[#F0FFDC] mb-2 mx-2 my-2 pb-6 '>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">{item.price}</td>
                <td className="py-3 px-4 text-center">{item.qty}</td>
                <td className="py-3 px-4 text-center">{item.discount}</td>
                <td className="py-3 px-4 text-center">{item.tax}</td>
                <td className="py-3 px-4 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
