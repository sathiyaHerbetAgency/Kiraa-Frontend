"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Receipt,
  PiggyBank,
  FileText,
  ClipboardList,
  Boxes,
  HelpCircle,
  Settings,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  {
    name: "Income",
    href: "/Income",
    icon: PiggyBank,
    children: [
      { name: "Invoice", href: "/Income/Invoice", icon: FileText },
      { name: "Quotation", href: "/income/quotation", icon: ClipboardList },
      { name: "Order", href: "/income/order", icon: ClipboardList },
    ],
  },
  { name: "Expense", href: "/expense", icon: PiggyBank },
  { name: "Fixed Assets", href: "/fixed-assets", icon: Boxes },
  { name: "Help Center", href: "/help", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]
export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 mt-20 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${
                            pathname === item.href
                              ? "bg-gray-50 text-primary"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                            ${
                              pathname.startsWith(item.href)
                                ? "bg-gray-50 text-primary"
                                : "text-gray-700 hover:text-primary hover:bg-gray-50"
                            }
                          `}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 pl-11 text-sm leading-6
                              ${
                                pathname === child.href
                                  ? "bg-gray-50 text-primary font-semibold"
                                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
                              }
                            `}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

