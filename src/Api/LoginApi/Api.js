import axios from 'axios';
import { apiurl } from '../ApiUrl/apiurl';



    export const LoginApi=async(data)=>{
      try{  
         const res= await axios.post(`${apiurl}/clients/api/login`, data)
         return res
      }catch(err){
       
        return err
      }
      }