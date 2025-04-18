"use client"

import  React,{useEffect} from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CharAcc } from './../../Api/ChartAccApi/Api';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const categories = [
  {
    name: "ASSETS",
    range: "1000 - 1999",
    accounts: [
      { code: "1100", name: "Cash in Hand" },
      { code: "1105", name: "Cash at Bank" },
      { code: "1110", name: "Petty Cash" },
      { code: "1120", name: "Accounts Receivable (Debtors)" },
      { code: "1130", name: "Less: Allowance for Doubtful Debts" },
      { code: "1140", name: "Inventory (Stock)" },
      { code: "1150", name: "Prepaid Expenses" },
      { code: "1160", name: "Input Tax (SST/GST)" },
      { code: "1170", name: "Deposits & Advances Paid" },
      { code: "1200", name: "Land & Buildings" },
      { code: "1210", name: "Furniture & Fixtures" },
      { code: "1220", name: "Office Equipment" },
      { code: "1230", name: "Vehicles" },
      { code: "1240", name: "Machinery & Tools" },
      { code: "1250", name: "Computers & Software" },
      { code: "1260", name: "Less: Accumulated Depreciation - Buildings" },
      { code: "1265", name: "Less: Accumulated Depreciation - Furniture & Fixtures" },
      { code: "1270", name: "Less: Accumulated Depreciation - Office Equipment" },
      { code: "1275", name: "Less: Accumulated Depreciation - Vehicles" },
      { code: "1280", name: "Less: Accumulated Depreciation - Machinery & Tools" },
      { code: "1285", name: "Less: Accumulated Depreciation - Computers & Software" },
      { code: "1300", name: "Investments (Stocks, Bonds)" },
      { code: "1310", name: "Goodwill" },
      { code: "1320", name: "Intangible Assets (Patents, Trademarks)" },
      { code: "1330", name: "Less: Amortization of Intangible Assets" },
    ],
  },
  {
    name: "LIABILITIES",
    range: "2000 - 2999",
    accounts: [
      { code: "2100", name: "Accounts Payable (Creditors)" },
      { code: "2110", name: "Sales Tax Payable (SST)" },
      { code: "2120", name: "Accrued Liabilities (Expenses Payable)" },
      { code: "2130", name: "Wages & Salaries Payable" },
      { code: "2140", name: "Other Payables & Deposits Received" },
      { code: "2150", name: "Loan Interest Payable" },
      { code: "2160", name: "Unearned Revenue (Advance Payments Received)" },
      { code: "2170", name: "Corporate Tax Payable" },
      { code: "2180", name: "Deferred Tax Liability" },
      { code: "2190", name: "Provision for Tax" },
      { code: "2240", name: "Amount Owed to Director(s)" },
      { code: "2250", name: "Amount Owed to Shareholder(s)" },
      { code: "2260", name: "Director's Personal Expenses Paid by Company" },
      { code: "2200", name: "Bank Loan Payable" },
      { code: "2210", name: "Hire Purchase Payable" },
      { code: "2220", name: "Mortgage Payable" },
      { code: "2230", name: "Director's Loan Payable" },
    ],
  },
]

export default function CategorizedDropdown() {
  const [data, setData] = React.useState([]);
  const [selectedAccount, setSelectedAccount] = React.useState(null)
  useEffect( ()=>{
    const fetchData = async () => {
      try {
      
         const response=await CharAcc()
         console.log(response.data[0].categories)
       
        setData(response.data[0].categories); // Update state with fetched data
      } catch (err) {
        console.log(err.message); // Capture and set the error
      } 
    };

    fetchData();
   
  },[])
  const handleSelect = (value) => {
    // Find the selected account from all categories
    for (const category of categories) {
      const account = category.accounts?.find((acc) => acc.code === value)
      if (account) {
        setSelectedAccount(account)
        break
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[400px] justify-between">
            {selectedAccount ? (
              <span className="flex items-center gap-2">
                <span className="font-mono">{selectedAccount.code}</span>
                <span className="text-muted-foreground">-</span>
                <span>{selectedAccount.name}</span>
              </span>
            ) : (
              "Select Account"
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] max-h-[500px] overflow-y-auto">
          {data.map((category) => (
            <React.Fragment key={category.name}>
              <DropdownMenuLabel className="flex justify-between">
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.range}</span>
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup value={selectedAccount?.code} onValueChange={handleSelect}>
                {category.accounts.map((account) => (
                  <DropdownMenuRadioItem
                    key={account.code}
                    value={account.code}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{account.code}</span>
                      <span className="text-muted-foreground">-</span>
                      <span>{account.name}</span>
                    </div>
                    {selectedAccount?.code === account.code && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedAccount && (
        <p className="text-sm text-muted-foreground">
          Selected Account: {selectedAccount.code} - {selectedAccount.name}
        </p>
      )}
    </div>
  )
}

