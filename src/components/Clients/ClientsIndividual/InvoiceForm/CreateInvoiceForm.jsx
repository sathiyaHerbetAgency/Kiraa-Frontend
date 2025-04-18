'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Action from './../../../widgets/Action';
import CalendarInput from './CalendarInput';
import InvoiceFields from './InvoiceFields';
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { InvoiceSave } from './../../../../Api/InvoiceApi/Api';
import { formSchema } from './formSchema';

export const CreateInvoice = ({onAddOrUpdate}) => {
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
      inv_due_date:''
    },
    mode: "onChange",
  });

  const generateFourDigitId = () => `inv-${Math.floor(1000 + Math.random() * 9000)}`;
  const getCurrentFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear().toString() // Get last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0, pad with 0
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  async function onSubmit(values) {
    const data = {
      ...values,
      inv_id: generateFourDigitId(),
      client_id: segment,
      inv_due_date:new Date(date).toISOString().split('T')[0],
      inv_date_issued:getCurrentFormattedDate()
    };
    const res = await InvoiceSave(data);
    if (res?.status === 200) {
      onAddOrUpdate(data);
      toast.success("Successfully Submitted");
      setOpen(false);
    } else {
      toast.error("Error, Please Try Again");
    }
  }

  return (
    <Action
      title="Create Invoice"
      desc="Create a new invoice"
      trigger={
        <Button className="space-x-1 bg-[#00000080] rounded-[100px] border px-4 py-2 hover:bg-[#00000080] text-white">
          <span>Create Invoice</span>
          <span className="text-lg">+</span>
        </Button>
      }
      open={open}
      setOpen={setOpen}
    >
      <InvoiceFields form={form} onSubmit={onSubmit} date={date} setDate={setDate} />
    </Action>
  );
};
