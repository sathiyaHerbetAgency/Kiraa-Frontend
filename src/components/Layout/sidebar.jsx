
// components/layout/Sidebar.jsx
/* eslint-disable */
"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Folder,
  Users,
  Briefcase,
  ChevronDown,
  DollarSign,
  CreditCard,
  FileText,
  FileSpreadsheet,
  ClipboardList,
  FileCheck,
  Package,
  Receipt,
  LineChart,
  Shield,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { useRequireAuth } from './useRequireAuth'
export default function Sidebar() {
  // const [checked, setChecked] = useState(false)   // ← have we verified auth yet?
  const [openSections, setOpenSections] = useState();
  const router = useRouter()
  const pathname = usePathname();
  const checked = useRequireAuth()
  const sections = [
    {
      key: "contacts",
      title: "Contacts",
      items: [
        { label: "Clients", href: "/clients", Icon: Users },
        { label: "Vendors", href: "/vendors", Icon: Briefcase },
      ],
    },
    {
      key: "transactions",
      title: "Transactions",
      items: [
        { label: "Bank", href: "/transactions/bank", Icon: DollarSign },
        { label: "Credit Cards", href: "/transactions/cards", Icon: CreditCard },
      ],
    },
    {
      key: "sales",
      title: "Sales",
      items: [
        { label: "Invoice", href: "/sales/invoice", Icon: FileText },
        { label: "Quotation", href: "/sales/quotation", Icon: FileSpreadsheet },
        { label: "Order", href: "/sales/order", Icon: ClipboardList },
        { label: "Approval", href: "/sales/approval", Icon: FileCheck },
        { label: "Products", href: "/sales/products", Icon: Package },
      ],
    },
    {
      key: "hr",
      title: "HR",
      items: [
        { label: "Payroll", href: "/hr/payroll", Icon: DollarSign },
        { label: "Leaves", href: "/hr/leaves", Icon: Clock },
        { label: "Claims", href: "/hr/claims", Icon: ShoppingBag },
      ],
    },
  ]
  useEffect(() => {
    const newOpen = {};
    sections.forEach(({ key, items }) => {
      newOpen[key] = items.some((item) => pathname.startsWith(item.href));
    });
    setOpenSections(newOpen);
  }, [pathname]);

  // useEffect(() => {
  //   // 1️⃣ Check auth
  //   const token = Cookies.get('token')
  //   if (!token) {
  //     // use replace so user can’t “back” into a protected page
  //     router.replace('/login')
  //     return
  //   }
  //   setChecked(true)
  // }, [router])

  // While we’re waiting for the token-check, render nothing (or a spinner)
  if (!checked) return null;
;

  // State of which sections are open


  // On mount and whenever the path changes, open the section matching the path

  // Toggle individual section
  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Helper to highlight active links
  const linkClasses = (href, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return isActive
      ? "bg-[#aeed21] text-[#002619]"
      : "text-black hover:bg-gray-100";
  };

  return (
    <aside
      className="
        fixed inset-y-0 left-0 w-64 h-screen
        bg-white border-r border-gray-200
        flex flex-col overflow-y-auto
        z-50 hidden md:flex
      "
    >
      <nav className="p-4 space-y-2">
        {/* Brand */}
        <div className="px-2 py-1 text-xl font-semibold text-black">
          Kiraa.
        </div>

        {/* Top-level links */}
        <Button
          variant="ghost"
          asChild
          className={`w-full justify-start px-2 ${linkClasses("/", true)}`}
        >
          <Link href="/">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className={`w-full justify-start px-2 ${linkClasses("/shoebox", true)}`}
        >
          <Link href="/shoebox">
            <Folder className="h-5 w-5 mr-2" />
            Shoebox
          </Link>
        </Button>

        {/* Collapsible Sections */}
        {sections.map(({ key, title, items }) => (
          <div key={key} className="mt-4">
            <div
              onClick={() => toggleSection(key)}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-black hover:bg-gray-100 rounded"
            >
              <span className="text-sm font-medium">{title}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections[key] ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSections[key] &&
              items.map(({ label, href, Icon }) => (
                <Button
                  key={label}
                  variant="ghost"
                  asChild
                  className={`w-full justify-start px-2 pl-8 ${linkClasses(href)}`}
                >
                  <Link href={href}>
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Link>
                </Button>
              ))}
          </div>
        ))}

        {/* Bottom Links */}
        <div className="mt-6 space-y-2">
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start px-2 ${linkClasses("/expense", true)}`}
          >
            <Link href="/expense">
              <Receipt className="h-5 w-5 mr-2" />
              Expense
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start px-2 ${linkClasses("/reports", true)}`}
          >
            <Link href="/reports">
              <LineChart className="h-5 w-5 mr-2" />
              Reports
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start px-2 ${linkClasses("/assets", true)}`}
          >
            <Link href="/assets">
              <Shield className="h-5 w-5 mr-2" />
              Assets
            </Link>
          </Button>
        </div>
      </nav>
    </aside>
  );
}
