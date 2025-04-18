'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Action from './../../widgets/Action';
import CalendarInput from './CalendarInput';
import EditInvoiceFields from './EditInvoiceFields';
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { InvoiceSave } from './../../../Api/InvoiceApi/Api';
import { formSchema } from './formSchema';

export const EditInvoice = ({data}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const segment = pathname.split('/')[2] || '';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inv_service: "",
      inv_description: '',
      inv_due_amount: 0,
      inv_tax_amount: 0,
      inv_qty: 0,
      inv_status: false, // Default to false for Unpaid
      client_name:'',
      client_address:'',
      client_email:''
    },
    mode: "onChange",
  });

  const generateFourDigitId = () => `inv-${Math.floor(1000 + Math.random() * 9000)}`;

  async function onSubmit(values) {
    const data = {
      ...values,
      inv_id: generateFourDigitId(),
      client_id: segment,
    };
    const res = await InvoiceSave(data);
    if (res?.status === 200) {
      //onAddOrUpdate(data);
      toast.success("Successfully Submitted");
      setOpen(false);
    } else {
      toast.error("Error, Please Try Again");
    }
  }

  return (
    // <Action
    //   title="Create Invoice"
    //   desc="Create a new invoice"
    //   trigger={
    //     <Button className="space-x-1 bg-[#00000080] rounded-[100px] border px-4 py-2 hover:bg-[#00000080] text-white">
    //       <span>Create Invoice</span>
    //       <span className="text-lg">+</span>
    //     </Button>
    //   }
    //   open={open}
    //   setOpen={setOpen}
    // >
      <EditInvoiceFields data={data}  form={form} onSubmit={onSubmit} date={date} setDate={setDate} />
    // </Action>
  );
};
