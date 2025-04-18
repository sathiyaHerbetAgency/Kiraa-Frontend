import axios from 'axios';
import { apiurl } from '../ApiUrl/apiurl';

  export const InvoiceSave=async(data)=>{
   try{  
    const res= await axios.post(`${apiurl}/clients/api/invoicedetailssave`, data)
    return res
    }catch(err){
      console.log(err)
      return err
    }
  }
  

  export const InvoiceDatas=async(id)=>{
    try{  
       const res= await axios.get(`${apiurl}/clients/api/invoicedatas/${id}`)
       return res
    }catch(err){
     
      return err
    }
    }

    export const IndividualInvoiceData=async(id)=>{
      try{  
         const res= await axios.get(`${apiurl}/clients/api/invoicedata/${id}`)
         return res
      }catch(err){
       
        return err
      }
      }

      export const InvoiceSummary=async()=>{
        try{  
           const res= await axios.get(`${apiurl}/clients/api/invoicesummary/`)
           return res
        }catch(err){
         
          return err
        }
        }
    