"use client"

export function InvoiceActions({ onDownload, isGeneratingPDF }) {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
        Edit Invoice
      </button>
      <button
        onClick={onDownload}
        disabled={isGeneratingPDF}
        className="px-4 py-2 bg-[#002619] text-white rounded-md hover:bg-green-800 transition-colors disabled:opacity-70"
      >
        {isGeneratingPDF ? "Generating PDF..." : "Download Invoice"}
      </button>
    </div>
  )
}
