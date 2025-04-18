'use client'
import React from 'react'
import { CssVariables } from './../../CssVariable/ComponentCss';
import {CreateClient} from './CreateClient'
import { CreateInvoice } from './InvoiceForm/CreateInvoiceForm';
const ClientHeader = ({ onAddOrUpdate, data }) => {
  return (
    <div className='flex justify-between w-full mt-6'>
        <h2 className={CssVariables.titleClass}>{data[0]?.client_name}</h2>
        {/* <button className="flex bg-[#00000080] px-4 py-2 rounded-3xl">
            <p className={`${CssVariables.cardTitleClass} text-white border-r-2 border-[#00000033] pr-8`}>Add Client</p> 
            <p className={`${CssVariables.cardTitleClass} text-white pl-2`}>+</p> 
        </button> */}
        {/* <CreateClient onAddOrUpdate={onAddOrUpdate} /> */}
        <CreateInvoice onAddOrUpdate={onAddOrUpdate} />
    </div>
  )
}

export default ClientHeader