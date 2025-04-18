import { useState, useEffect,useCallback } from "react";
import { usePathname } from 'next/navigation';
import { IndividualInvoiceData } from './../../Api/InvoiceApi/Api';

const useInvoiceData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pathname = usePathname()

    setLoading(true);
    async function fetchData(){
    try {
      const id = location.pathname.split("/").pop();
      if (id) {
        const response = await IndividualInvoiceData(id);
        setData(response.data[0]);
        console.log(response.data[0])
        return data
      } else {
        setError("Invalid ID in the URL");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
    return {fetchData}


 
};

export default useInvoiceData;
