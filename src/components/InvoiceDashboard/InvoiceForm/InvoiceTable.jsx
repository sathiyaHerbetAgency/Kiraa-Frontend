import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { CssVariables } from './../../CssVariable/ComponentCss';

import { createClients } from './../../../actions/invoiceActions';
import { ClientSave,ClientDatas } from './../../../Api/ClientApi/Api';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect,useState } from 'react';
const InvoiceTable = ({data,onRowClick}) => {
  function sum(due, qty, tax) {
    const dueAmount = Number(due);
    const quantity = Number(qty);
    const taxAmount = Number(tax);
  
    if (isNaN(dueAmount) || isNaN(quantity) || isNaN(taxAmount)) {
      console.error("Invalid input: Please provide numbers or numeric strings.");
      return 0; // Handle error gracefully
    }
  
    const total = (dueAmount * quantity) + taxAmount;
    return total;
  }
  
  return (
    <div className="border border-[#00000033] rounded-lg mt-6 py-6 px-3">
    <Table className='w-full self-center '>
    <TableHeader>
      <TableRow className="border-0 text-right ">
        <TableHead className={CssVariables.cardTitleClass}>No</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Date Issued</TableHead>

        <TableHead className={CssVariables.cardTitleClass}>Activity</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Invoiced</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Status</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Payment</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Balance</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {data?.map((each)=>
            <TableRow key={each.client_id} onClick={() => onRowClick(each.inv_id)} className="border-0 cursor-pointer" >
            <TableCell className={CssVariables.tableContent}>{each.inv_id}</TableCell>
            <TableCell className={CssVariables.tableContent}>{new Date(each.inv_date_issued).toLocaleDateString()}</TableCell>

            <TableCell className={ ` ${CssVariables.tableContent} w-[40%] `}>{each.inv_service}</TableCell>
            <TableCell className={CssVariables.tableContent}>{sum(each.inv_due_amount,each.inv_qty,each.inv_tax_amount)}</TableCell>
            <TableCell className={CssVariables.tableContent}>{(each.inv_status)?"paid":'unpaid'}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Unpaid}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Pending}</TableCell>

            </TableRow>
        )}
     
     
    </TableBody>
  </Table>
  </div>
  )
}

export default InvoiceTable