import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InvoiceDetails({ invoice, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...invoice, [field]: value })
  }

  const handlePaymentTermsChange = (value) => {
    if (value === "custom") {
      // Keep the current value if switching to custom
      return
    }

    const months = Number.parseInt(value)
    const dueDate = new Date(invoice.date)
    dueDate.setMonth(dueDate.getMonth() + months)

    onChange({
      ...invoice,
      paymentTerms: value,
      dueDate,
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Invoice Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoice-number">Invoice Number</Label>
          <Input id="invoice-number" value={invoice.number} onChange={(e) => handleChange("number", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-terms">Payment Terms</Label>
          <Select value={invoice.paymentTerms} onValueChange={handlePaymentTermsChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Months</SelectItem>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.date ? format(invoice.date, "dd/MM/yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoice.date}
                onSelect={(date) => {
                  handleChange("date", date)
                  // Update due date if payment terms is set
                  if (invoice.paymentTerms && invoice.paymentTerms !== "custom") {
                    const months = Number.parseInt(invoice.paymentTerms)
                    const dueDate = new Date(date)
                    dueDate.setMonth(dueDate.getMonth() + months)
                    handleChange("dueDate", dueDate)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                disabled={invoice.paymentTerms && invoice.paymentTerms !== "custom"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.dueDate ? format(invoice.dueDate, "dd/MM/yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoice.dueDate}
                onSelect={(date) => handleChange("dueDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ref">Reference</Label>
        <Input id="ref" value={invoice.ref} onChange={(e) => handleChange("ref", e.target.value)} />
      </div>
    </div>
  )
}
