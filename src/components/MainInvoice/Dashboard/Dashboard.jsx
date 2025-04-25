// /* eslint-disable */
// "use client"

// import { useState,useEffect } from "react"
// import MetricCard from "@/components/ui/metric-card"
// // import ClientsTable from "@/clients/clients-table"
// import ActivityFeed from "./Component/Activity/activity-feed"
// import { Button } from "@/components/ui/button"
// import { Search } from "lucide-react"
// import ViewToggle from "@/components/ui/view-toggle"
// import FilterButton from "@/components/ui/filter-button"
// import SortButton from "@/components/ui/sort-button"
// import ClientsTable from './Component/Clients/clients-table';
// import Link from "next/link"
// import { InvoiceSummary } from './../../../Api/InvoiceApi/Api';

// export default function Dashboard() {
//   const [viewType, setViewType] = useState("list")
//   const [clientsData, setClientsData]=useState(null)
//   useEffect(() => {
//     let isMounted = true;
  
//     (async () => {
//       try {
//         const response = await InvoiceSummary();
//         if (isMounted) {
//           console.log(response.data); // Log fetched data
//           setClientsData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching invoice summary:", error);
//       }
//     })();
  
//     return () => {
//       isMounted = false;
//     };
//   }, []);

// // Outputs: "17 February 2024"
  
//   const metricsData = [
//     {
//       title: "Invoiced",
//       value: "59,287",
//       subtitle: "429 invoices",
//       color: "black",
//       mtd: true,
//     },
//     {
//       title: "Total Paid",
//       value: "10,432",
//       subtitle: "18 invoices",
//       color: "green",
//       mtd: true,
//     },
//     {
//       title: "Total Income",
//       value: "7,321",
//       subtitle: "6 invoices",
//       color: "red",
//       mtd: true,
//     },
//     {
//       title: "Pending",
//       value: "7,321",
//       subtitle: "3 invoices",
//       color: "yellow",
//       mtd: true,
//     },
//     {
//       title: "Clients",
//       value: "20",
//       subtitle: "",
//       color: "purple",
//       mtd: false,
//     },
//   ]

//   // const clientsData = [
//   //   { invNumber: "INV-0124", customer: "Hitman Sdn Bhd", invoices: 25, amount: 10500, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Autolavn", invoices: 30, amount: 2154, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Fatima", invoices: 20, amount: 3500, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Santus", invoices: 15, amount: 3500, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Glass Pro", invoices: 10, amount: 3500, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Top Clove", invoices: 11, amount: 1900, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Emico", invoices: 14, amount: 2000, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Pepsi", invoices: 37, amount: 3000, lastInvoiced: "10/02/2025" },
//   //   { invNumber: "INV-0124", customer: "Ghee", invoices: 28, amount: 2000, lastInvoiced: "10/02/2025" },
//   // ]

//   const activitiesData = [
//     {
//       id: 1,
//       user: { name: "Amir Norman", avatar: "/placeholder.svg?height=40&width=40" },
//       action: "created",
//       subject: "Invoice PO-4491",
//       time: "1hr ago",
//     },
//     {
//       id: 2,
//       subject: "Invoice JL-34328",
//       action: "was sent to",
//       target: "Chester Corp",
//       time: "2hrs ago",
//     },
//     {
//       id: 3,
//       subject: "Invoice SP-3122",
//       action: "was sent to",
//       target: "Hitman Corp",
//       time: "Yesterday, 3:30PM",
//     },
//     {
//       id: 4,
//       user: { name: "Amir Norman", avatar: "/placeholder.svg?height=40&width=40" },
//       action: "edited",
//       subject: "Invoice SP-3122",
//       time: "Yesterday, 4:15PM",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Overview</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//             {metricsData.map((metric, index) => (
//               <MetricCard key={index} {...metric} />
//             ))}
//           </div>
//         </section>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <section>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">All Clients</h2>
//               </div>

//               <div className="flex items-center justify-between mb-4">
//                 <ViewToggle activeView={viewType} onViewChange={setViewType} />
//                 <Link href='/Create-Invoice'>
//                   <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
//                     <span className="text-lg">+</span>
//                     Create New Invoice
//                   </Button>
//                 </Link>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 mb-4">
//                 <div className="relative flex-grow">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <FilterButton />
//                   <SortButton />
//                 </div>
//               </div>
//             <ClientsTable data={clientsData}/>
//             </section>
//           </div>

//           <div>
//             <section>
//               <h2 className="text-2xl font-bold mb-4">Activities</h2>
//               <ActivityFeed activities={activitiesData} />
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Bell,
  ChevronDown,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Users,
  Briefcase,
  ClipboardList,
  FileCheck,
  FileSpreadsheet,
  Folder,
  Receipt,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { AreaChart } from "./Component/Charts/area-chart"
import { BarChart } from "./Component/Charts/bar-chart"
import { DonutChart } from "./Component/Charts/donut-chart"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      {/* <div className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold text-xl">
            Kiraa.
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Button
              variant="ghost"
              asChild
              className="justify-start gap-2 px-2 bg-[#aeed21] text-[#002619] hover:bg-[#aeed21]/90"
            >
              <Link href="#">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2">
              <Link href="#">
                <Folder className="h-4 w-4" />
                Shoebox
              </Link>
            </Button>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-medium">Contacts</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <Users className="h-4 w-4" />
                Clients
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <Briefcase className="h-4 w-4" />
                Vendors
              </Link>
            </Button>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-medium">Transactions</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <DollarSign className="h-4 w-4" />
                Bank
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <CreditCard className="h-4 w-4" />
                Credit Cards
              </Link>
            </Button>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-medium">Sales</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <FileText className="h-4 w-4" />
                Invoice
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <FileSpreadsheet className="h-4 w-4" />
                Quotation
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <ClipboardList className="h-4 w-4" />
                Order
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <FileCheck className="h-4 w-4" />
                Approval
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <Package className="h-4 w-4" />
                Products
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2">
              <Link href="#">
                <Receipt className="h-4 w-4" />
                Expense
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2">
              <Link href="#">
                <LineChart className="h-4 w-4" />
                Reports
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2">
              <Link href="#">
                <Shield className="h-4 w-4" />
                Assets
              </Link>
            </Button>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-medium">HR</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <DollarSign className="h-4 w-4" />
                Payroll
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <Clock className="h-4 w-4" />
                Leaves
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start gap-2 px-2 pl-6">
              <Link href="#">
                <ShoppingBag className="h-4 w-4" />
                Claims
              </Link>
            </Button>
          </nav>
        </div>
      </div> */}
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        {/* <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px]">
          <div className="w-full flex-1" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Clock className="h-5 w-5" />
              <span className="sr-only">Recent</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </div>
        </header> */}
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-md pl-8 bg-white border-gray-200"
                />
              </div>
              <Link href='/Create-Invoice'>
                <Button className="bg-[#002619] hover:bg-[#002619]/90 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Invoice
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Invoiced</CardTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  MTR
                  <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">59,287</div>
                <div className="text-xs text-gray-500 mt-1">429 invoices</div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Paid</CardTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  MTR
                  <div className="h-5 w-5 rounded-full bg-[#cff0e6] flex items-center justify-center">
                    <span className="text-[#37bd93] text-xs">$</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">10,432</div>
                <div className="text-xs text-[#37bd93] bg-[#cff0e6] inline-block px-2 py-0.5 rounded-full mt-1">
                  15 invoices
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Unpaid</CardTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  MTR
                  <div className="h-5 w-5 rounded-full bg-[#ffeaee] flex items-center justify-center">
                    <span className="text-[#d24245] text-xs">$</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7,321</div>
                <div className="text-xs text-[#d24245] bg-[#ffeaee] inline-block px-2 py-0.5 rounded-full mt-1">
                  6 invoices
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  MTR
                  <div className="h-5 w-5 rounded-full bg-[#fff5d6] flex items-center justify-center">
                    <span className="text-[#ffcf40] text-xs">$</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7,321</div>
                <div className="text-xs text-[#ffcf40] bg-[#fff5d6] inline-block px-2 py-0.5 rounded-full mt-1">
                  5 invoices
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Clients</CardTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="h-5 w-5 rounded-full bg-[#fae2ff] flex items-center justify-center">
                    <span className="text-[#aa02d0] text-xs">@</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">20</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="col-span-1 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Cash Flow</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <AreaChart />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Sales Receivable</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <AreaChart />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Bills to Pay</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <AreaChart />
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Operational Expenses</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <div className="flex flex-col items-center justify-center">
                  <DonutChart />
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium">Spending for March</h3>
                    <p className="text-3xl font-bold">0</p>
                    <Button className="mt-4 bg-[#002619] hover:bg-[#002619]/90 text-white gap-2">
                      <Plus className="h-4 w-4" />
                      Create New Expense
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Profit & Loss</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <div className="flex flex-col">
                  <BarChart />
                  <div className="flex justify-center mt-4">
                    <Button className="bg-[#002619] hover:bg-[#002619]/90 text-white gap-2">
                      <Plus className="h-4 w-4" />
                      Create New Sales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Chart */}
          <div className="grid gap-4 mb-6">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Account</CardTitle>
                <div className="flex items-center gap-1 text-xs">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Monthly
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium">Cash</h3>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    Choose Account
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                <AreaChart />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
// create components files so the each files last only few lines so loading faster