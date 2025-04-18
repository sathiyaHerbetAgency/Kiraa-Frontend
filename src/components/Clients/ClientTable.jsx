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
import { CssVariables } from './../CssVariable/ComponentCss';

import { createClients } from './../../actions/invoiceActions';
import { ClientSave,ClientDatas } from './../../Api/ClientApi/Api';

import { useRouter } from "next/navigation";
import { useEffect,useState } from 'react';
const ClientTable = ({data,onRowClick}) => {
  //   const data=   [
  //       {
  //         "No": 1,
  //         "Name": "Hitman",
  //         "Invoiced": 10500,
  //         "Paid": 10500,
  //         "Unpaid": 10500,
  //         "Pending": 10500
  //       },
  //       {
  //         "No": 2,
  //         "Name": "Autobarn",
  //         "Invoiced": 2154,
  //         "Paid": 2154,
  //         "Unpaid": 2154,
  //         "Pending": 2154
  //       },
  //       {
  //         "No": 3,
  //         "Name": "Fatima",
  //         "Invoiced": 3500,
  //         "Paid": 3500,
  //         "Unpaid": 3500,
  //         "Pending": 3500
  //       },
  //       {
  //         "No": 4,
  //         "Name": "Sambal",
  //         "Invoiced": 3500,
  //         "Paid": 3500,
  //         "Unpaid": 3500,
  //         "Pending": 3500
  //       },
  //       {
  //         "No": 5,
  //         "Name": "Glass Pro",
  //         "Invoiced": 3500,
  //         "Paid": 3500,
  //         "Unpaid": 3500,
  //         "Pending": 3500
  //       },
  //       {
  //         "No": 6,
  //         "Name": "Top Clove",
  //         "Invoiced": 1500,
  //         "Paid": 1500,
  //         "Unpaid": 1500,
  //         "Pending": 1500
  //       },
  //       {
  //         "No": 7,
  //         "Name": "Enrico",
  //         "Invoiced": 2000,
  //         "Paid": 2000,
  //         "Unpaid": 2000,
  //         "Pending": 2000
  //       },
  //       {
  //         "No": 8,
  //         "Name": "Pepsi",
  //         "Invoiced": 5000,
  //         "Paid": 5000,
  //         "Unpaid": 5000,
  //         "Pending": 5000
  //       },
  //       {
  //         "No": 9,
  //         "Name": "Ghee",
  //         "Invoiced": 600,
  //         "Paid": 600,
  //         "Unpaid": 600,
  //         "Pending": 600
  //       }
  // ]

  return (
    <div className="border border-[#00000033] rounded-lg mt-6 py-6 px-3">
    <Table className='w-full self-center '>
    <TableHeader>
      <TableRow className="border-0 text-right">
        <TableHead className={CssVariables.cardTitleClass}>No</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Name</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Invoiced</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Paid</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Unpaid</TableHead>
        <TableHead className={CssVariables.cardTitleClass}>Pending</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {data?.map((each)=>
            <TableRow key={each.client_id} onClick={() => onRowClick(each.client_id)} className="border-0">
            <TableCell className={CssVariables.tableContent}>{each.client_id}</TableCell>
            <TableCell className={ ` ${CssVariables.tableContent} w-[40%] `}>{each.client_name}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Invoiced}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Paid}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Unpaid}</TableCell>
            <TableCell className={CssVariables.tableContent}>{each.Pending}</TableCell>

            </TableRow>
        )}
     
     
    </TableBody>
  </Table>
  </div>
  )
}

export default ClientTable