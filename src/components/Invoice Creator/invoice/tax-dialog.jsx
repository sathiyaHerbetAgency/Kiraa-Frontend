"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TaxDialog({ onAddTax }) {
  const [open, setOpen] = useState(false)
  const [tax, setTax] = useState({
    name: "",
    percentage: "",
  })

  const handleSubmit = () => {
    if (tax.name && tax.percentage) {
      onAddTax({
        ...tax,
        percentage: Number.parseFloat(tax.percentage),
      })
      setOpen(false)
      setTax({ name: "", percentage: "" })
    }
  }

  return (
    <>
      <Button variant="ghost" className="w-full justify-start text-sm font-normal" onClick={() => setOpen(true)}>
        Add Tax
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Tax</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tax-name">Tax Name</Label>
              <Input
                id="tax-name"
                value={tax.name}
                onChange={(e) => setTax({ ...tax, name: e.target.value })}
                placeholder="e.g., GST, VAT"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tax-percentage">Tax Percentage</Label>
              <Input
                id="tax-percentage"
                type="number"
                value={tax.percentage}
                onChange={(e) => setTax({ ...tax, percentage: e.target.value })}
                placeholder="e.g., 10"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Add Tax</Button>
          </div>
        </DialogContent>
      </Dialog>
        {/* <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover> */}
    </>
  )
}

