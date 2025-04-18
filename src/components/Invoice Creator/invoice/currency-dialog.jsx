"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CurrencyDialog({ onAddCurrency }) {
  const [open, setOpen] = useState(false)
  const [currency, setCurrency] = useState({
    code: "",
    name: "",
  })

  const handleSubmit = () => {
    if (currency.code && currency.name) {
      onAddCurrency(currency)
      setOpen(false)
      setCurrency({ code: "", name: "" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Add Currency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Currency</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="currency-code">Currency Code</Label>
            <Input
              id="currency-code"
              value={currency.code}
              onChange={(e) => setCurrency({ ...currency, code: e.target.value.toUpperCase() })}
              placeholder="e.g., EUR"
              maxLength={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency-name">Currency Name</Label>
            <Input
              id="currency-name"
              value={currency.name}
              onChange={(e) => setCurrency({ ...currency, name: e.target.value })}
              placeholder="e.g., Euro"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Add Currency</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

