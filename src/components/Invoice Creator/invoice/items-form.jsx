"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateItemAmount, generateUniqueId } from "../lib/invoice-utils"
import { TaxDialog } from "./tax-dialog"
import { CurrencySelector } from "./currency-selector"

export function ItemsForm({ items, currency, taxes, onCurrencyChange, onAddTax, onChange }) {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === "unitPrice" || field === "quantity" || field === "discount") {
      newItems[index] = updateItemAmount(newItems[index])
    }

    onChange(newItems)
  }

  const addItem = () => {
    onChange([
      ...items,
      {
        id: generateUniqueId(),
        description: "",
        unitPrice: 0,
        quantity: 1,
        tax: null,
        discount: 0,
        amount: 0,
      },
    ])
  }

  const removeItem = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Items</h3>
        <CurrencySelector value={currency} onChange={onCurrencyChange} />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative space-y-2 p-4 border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => removeItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="mb-4">
              <Label className="mb-2 block">Description</Label>
              <Input
                value={item.description}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
                placeholder="Item description"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="mb-2 block">Qty</Label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 0)}
                  placeholder="Qty"
                />
              </div>

              <div>
                <Label className="mb-2 block">Unit Price</Label>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                  placeholder="Unit Price"
                />
              </div>

              <div>
                <Label className="mb-2 block">Tax</Label>
                <div className="flex">
                  <Select value={item.tax} onValueChange={(value) => handleItemChange(index, "tax", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tax" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxes.map((tax) => (
                        <SelectItem key={tax.name} value={tax.name}>
                          {tax.name} ({tax.percentage}%)
                        </SelectItem>
                      ))}
                      <div className="border-t mt-1 pt-1">
                        <TaxDialog onAddTax={onAddTax} />
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Discount (%)</Label>
                <Input
                  type="number"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, "discount", Number.parseFloat(e.target.value) || 0)}
                  placeholder="Discount %"
                />
              </div>
            </div>

            <div className="flex justify-end text-sm text-muted-foreground mt-2">
              Amount: {currency} {item.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={addItem} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add more
        </Button>

        <Button variant="secondary">Save item</Button>
      </div>
    </div>
  )
}

