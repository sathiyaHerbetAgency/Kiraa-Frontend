import React, {useState, useEffect} from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CalendarInput from './CalendarInput';
import StatusSwitch from './StatusSwitch';
import { CssVariables } from './../../CssVariable/ComponentCss';
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IndividualClientData } from './../../../Api/ClientApi/Api';

const EditInvoiceFields = ({data, form, onSubmit, date, setDate }) => {
  const [item, setItem] = useState({
    service: "SDF54DFG112",
    description: "Retainer for October",
    unitPrice: "",
    quantity: "",
    tax: ""
  });
  const [clientData, setClientData]=useState([]);
  // console.log(clientData)

  useEffect( () => {
    if (data) {
      setItem({
        service: "SDF54DFG112",
        description: "Retainer for October",
        unitPrice: data?.inv_due_amount || "",
        quantity: data.inv_qty || "",
        tax: data.inv_tax_amount || ""
      });

      
    }
    const fetchData = async () => {
      
      try {
        const resonseClient=await IndividualClientData(data.client_id)
        console.log(resonseClient?.data[0])
        setClientData(resonseClient?.data[0])
       
      } catch (err) {
        console.log(err.message); // Capture and set the error
      } 
    };
  fetchData()

  }, [data]);
  // const [tax, setTax] = useState(300)

  const updateItem = (field, value) => {
    setItem({
      ...item,
      [field]: field === "unitPrice" || field === "quantity" || field==="tax" ? Number(value) || 0 : value,
    })
  }
  const updateTax = (value) => {
    setTax(Number(value) || 0)
  }

  console.log(item)
  const calculateSubTotal = () => item.unitPrice * item.quantity
  const tax = item.tax // Fixed tax as per the image
  const total = calculateSubTotal() + tax
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  space-y-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 min-w-[50%] ">
                <FormField control={form.control} name="inv_id" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Invoice No.</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter the Service" defaultValue={data?.inv_id} className={`${CssVariables.invoiceDashboardLabel} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="inv_currency" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Currency" defaultValue="MYR" className={`${CssVariables.invoiceDashboardInut} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                  <FormField control={form.control} name="inv_date_issued" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Date</FormLabel>
                    <FormControl>
                      <Input type='date' placeholder="Enter the Issued Date"  defaultValue={data?.inv_date_issued} className={`${CssVariables.invoiceDashboardInut} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                  <FormField control={form.control} name="inv_due_date" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Enter the Due Date" defaultValue={data?.inv_due_date} className={`${CssVariables.invoiceDashboardInut} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="inv_due_ref" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Ref</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Ref" defaultValue="POAMAL24" className={`${CssVariables.invoiceDashboardInut} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
          </div>
          <div className="flex flex-col min-w-[50%] ">
                  <FormField control={form.control} name="inv_id" render={({ field }) => (
                      <FormItem className="flex  items-center gap-4">
                        <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Client</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter the Service"defaultValue={clientData?.client_name} className={`${CssVariables.invoiceDashboardLabel} text-black w-[150px] bg-transparent border-none p-none m-0 `} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                <FormField control={form.control} name="inv_id" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Email</FormLabel>
                    <FormControl>
                      
                    <Input placeholder="Enter the Client Name" defaultValue={clientData?.client_email} className={`${CssVariables.invoiceDashboardLabel} text-black w-[250px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} /> 
              
                <FormField control={form.control} name="inv_id" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormLabel className={`${CssVariables.invoiceDashboardLabel}`}>Address</FormLabel>
                    <FormControl>
                    <Textarea  placeholder="Enter the Client Address" defaultValue={clientData?.client_address} className={`${CssVariables.invoiceDashboardLabel} text-black min-w-[250px] bg-transparent border-none p-none m-0 `} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
          </div>
        </div>
        <div className="w-full space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right  pr-8">QTY</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 mt-1 border-[#00000033] rounded-2xl p-0 ">
          <TableRow className="rounded-lg pt-1 pb-0" >
            <TableCell className="pt-0 pb-0">
               <FormField control={form.control} name="inv_service" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormControl>
                      <Input
                       defaultValue={data.inv_service}
                        onChange={(e) => updateItem("service", e.target.value)}
                        className={`${CssVariables.invoiceDashboardLabel} text-black w-[150px] bg-transparent border-none p-none m-0 `}
                      />                   
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </TableCell>
             <TableCell className="pt-0 pb-0">
                <FormField control={form.control} name="inv_description" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormControl>
                    <Input defaultValue={data?.inv_description}  className={`${CssVariables.invoiceDashboardLabel} text-black w-[250px] bg-transparent border-none p-none m-0 `} onChange={(e) => updateItem("description", e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </TableCell>
             <TableCell className="pt-0 pb-0">
               <FormField control={form.control} name="inv_amount" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormControl>
                      <Input
                          type="number"
                         defaultValue={data?.inv_due_amount}
                          onChange={(e) => updateItem("unitPrice", e.target.value)}
                          className={`${CssVariables.invoiceDashboardLabel} text-black text-right max-w-[100px] ml-auto bg-transparent border-none`}
                      />                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </TableCell>
             <TableCell className="pt-0 pb-0">
               <FormField control={form.control} name="inv_qty" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormControl>
                    <Input
                type="number"
                defaultValue={data?.inv_qty}
                onChange={(e) => updateItem("quantity", e.target.value)}
                className={`${CssVariables.invoiceDashboardLabel} text-black text-right max-w-[100px] ml-auto bg-transparent border-none`}
              />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </TableCell>
            <TableCell className="text-right">{calculateSubTotal().toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex flex-col items-end gap-2 text-sm">
        <div className="flex justify-between w-48">
          <span>Sub Total</span>
          <span>{calculateSubTotal().toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-48">
          <span>Discount</span>
          <span>-</span>
        </div>
        <div className="flex items-center justify-between w-48">
          <span>Tax</span>
          {/* <span>{tax.toLocaleString()}</span> */}
          <FormField control={form.control} name="inv_qty" render={({ field }) => (
                  <FormItem className="flex  items-center gap-4">
                    <FormControl>
                    <Input
                type="number"
                defaultValue={data?.inv_tax_amount}
                onChange={(e) => updateItem("tax", e.target.value)}
                className={`${CssVariables.invoiceDashboardLabel} text-black text-right max-w-[100px] ml-auto bg-transparent border-none`}
              />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
        </div>
        <div className="flex justify-between w-48 font-medium">
          <span>Total Amount</span>
          <span>{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" > Save Invoice</Button>
      </div>
    </div>
      </form>
    </Form>
  );
};

export default EditInvoiceFields;
