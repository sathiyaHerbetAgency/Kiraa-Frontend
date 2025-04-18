import axios from 'axios';
import { apiurl } from '../ApiUrl/apiurl';



    export const CharAcc=async()=>{
      try{  
         const res= await axios.get(`${apiurl}/clients/api/chartaccount`)
         return res
      }catch(err){
       
        return err
      }
      }