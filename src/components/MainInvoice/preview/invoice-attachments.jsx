import { FileIcon } from "lucide-react"

export function InvoiceAttachments({ attachments }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">General Attachments</h2>

      <div className="border border-dashed border-gray-300 rounded-md p-4 mb-4 text-center text-gray-500 text-sm">
        Upload or drop your files here
      </div>

      <div className="space-y-2">
        {attachments.map((attachment, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-md border mr-3">
                <FileIcon className="h-5 w-5 text-green-900" />
              </div>
              <span>{attachment.name}</span>
            </div>
            <span className="text-sm text-gray-500">{attachment.size}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
