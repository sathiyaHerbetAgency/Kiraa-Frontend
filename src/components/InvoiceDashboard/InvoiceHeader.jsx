import React from 'react'
import { CssVariables } from './../CssVariable/ComponentCss';
import { Button } from '@/components/ui/button';
import { sum } from './../Js/Functions';
import useInvoiceData from './../Custom Hooks/useInvoiceData';
import { useRouter } from 'next/navigation';

const InvoiceHeader = ({data}) => {  
  // const { data, loading, error } = useInvoiceData();
  // console.log(data,loading,error, fetchData)
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Navigates to the previous page in history
  };

  return (
    <div>
         <div className=" flex flex-col gap-6">
            <Button className="rounded-3xl px-8 w-fit"  onClick={handleGoBack} >Back</Button>
            <div className='flex justify-between items-center gap-3'>
              <div className="flex gap-3 items-center">
                <h1 className={`uppercase ${CssVariables.invoiceTitle} `}>{data.inv_id}</h1>
                <p>for {sum(data.inv_due_amount, data.inv_qty,data.inv_tax_amount)} </p>
                <Button className="bg-transparent border border-gray-400 rounded-3xl text-black px-10 Capitalize" >{data.inv_status?"paid":'unpaid'}</Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="rounded-3xl px-8 w-fit" >Download Invoice</Button>

              </div>
            </div>
        </div>
        <div className="border-t border-black border-top mt-6"></div>
    </div>
  )
}

export default InvoiceHeader