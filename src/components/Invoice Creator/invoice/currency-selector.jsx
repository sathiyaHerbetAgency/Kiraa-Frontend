"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CurrencyDialog } from "./currency-dialog"

export function CurrencySelector({ value, onChange, onAddCurrency }) {
  const [currencies, setCurrencies] = useState([
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "USD", name: "US Dollar" },
  ])

  const handleAddCurrency = (newCurrency) => {
    setCurrencies([...currencies, newCurrency])
    onAddCurrency && onAddCurrency(newCurrency)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.code}
            </SelectItem>
          ))}
          <div className="border-t mt-1 pt-1">
            <CurrencyDialog onAddCurrency={handleAddCurrency} />
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}

