'use client'
import React, {useEffect,useState} from 'react'
import { IndividualClientData } from './../../../Api/ClientApi/Api';
import { InvoiceDatas } from './../../../Api/InvoiceApi/Api';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from './../../../components/MaxWidthWapper/MaxWidthWrapper';
import Overview from './../../../components/Overview/Overview';
import CardsContainer from './../../../components/Clients/ClientsIndividual/CardsContainer';
import ClientHeader from './../../../components/Clients/ClientsIndividual/ClientHeader';
import { CreateInvoice } from './../../../components/Clients/ClientsIndividual/InvoiceForm/CreateInvoiceForm';
import InvoiceTable from './../../../components/Clients/ClientsIndividual/InvoiceForm/InvoiceTable';
const ClientDashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()
  const [invoiceData, setInvoiceData]=useState([])  
  const router = useRouter();

  useEffect( ()=>{
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before API call
        const id=pathname.split('/').pop();
        const response=await IndividualClientData(id);
        const invData=await InvoiceDatas(id)
        console.log(invData.data)
        setInvoiceData(invData.data)
        setData(response.data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Capture and set the error
      } finally {
        setLoading(false); // Set loading to false after the call
      }
    };

    fetchData();
   
  },[])
  const handleAddOrUpdate = (newItem) => {
    // Append new data locally
    console.log(newItem)
    setInvoiceData((prevData) => [...prevData, newItem]);
  }
  function handleRowClick (id)  {    
    // Navigate to the clientDashboard page with the client ID
    console.log(id)
    router.push(`/Invoices/${id}`);
  }
  return (
    <>
      {/* <h1 className="text-center"> ClientDashboard</h1>
      <h5>Client Name: {data[0]?.client_name}</h5>
      <h5>Client Email: {data[0]?.client_email}</h5>
      <h5>Client Id: {data[0]?.client_id}</h5> */}
      <MaxWidthWrapper>
      <Overview/>
      <CardsContainer />
      <ClientHeader onAddOrUpdate={handleAddOrUpdate} data={data} /> 
      <InvoiceTable data={invoiceData} onRowClick={handleRowClick} />
      </MaxWidthWrapper>
    </>
  )
}

export default ClientDashboard