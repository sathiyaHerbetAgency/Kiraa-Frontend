import axios from 'axios';
import { apiurl } from '../ApiUrl/apiurl';
import { calculateItemAmount } from './../../components/Invoice Creator/lib/invoice-utils';

export const ClientSave=async(data)=>{
  console.log(`${apiurl}/clients/api/clientdetailssave`)
  try{  
  const res= await axios.post(`${apiurl}/clients/api/clientdetailssave`, data)
  return res
  }catch(err){
    console.log(err)
    return err
  }
  }
  

  export const ClientDatas=async()=>{
    try{  
       const res= await axios.get(`${apiurl}/clients/api/clientdatas`)
       console.log(res.data)
       return res
    }catch(err){
     
      return err
    }
    }

    export const IndividualClientData=async(id)=>{
      try{  
         const res= await axios.get(`${apiurl}/clients/api/clientdata/${id}`)
         return res
      }catch(err){
       
        return err
      }
      }