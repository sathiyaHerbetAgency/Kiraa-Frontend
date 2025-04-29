export function InvoiceTotals({ totals }) {
  return (
    <div className="bg-[#002619] text-white p-4 rounded-md mb-8">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm">Sub Total</p>
          <p className="text-sm mt-2">Discount</p>
          <p className="text-sm mt-2">Tax</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{totals.subtotal}</p>
          <p className="text-sm mt-2">{totals.discount}</p>
          <p className="text-sm mt-2">{totals.tax}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-green-700 grid grid-cols-2 gap-2">
        <div>
          <p className="font-medium">Total</p>
        </div>
        <div className="text-right">
          <p className="font-medium">{totals.total}</p>
          <p className="text-xs mt-1">{totals.totalInWords}</p>
        </div>
      </div>
    </div>
  )
}
