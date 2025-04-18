/* eslint-disable */
'use client'
import React, {useState, useEffect} from 'react'
import MaxWidthWrapper from './../../components/MaxWidthWapper/MaxWidthWrapper';
import Overview from './../../components/Overview/Overview';
import CardsContainer from './../../components/Clients/CardsContainer';
import ClientHeader from './../../components/Clients/ClientHeader';
import ClientTable from './../../components/Clients/ClientTable';
import { ClientSave,ClientDatas } from './../../Api/ClientApi/Api';
import { useRouter } from 'next/navigation';
const clients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect( ()=>{
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true before API call
          const response=await ClientDatas();

          setData(response.data); // Update state with fetched data
        } catch (err) {
          setError(err.message); // Capture and set the error
        } finally {
          setLoading(false); // Set loading to false after the call
        }
      };
  
      fetchData();
     
    },[data])
    const handleAddOrUpdate = (newItem) => {
      // Append new data locally
      setData((prevData) => [...prevData, newItem]);
    }

    function handleRowClick (id)  {    
        // Navigate to the clientDashboard page with the client ID
        router.push(`Clients/${id}`);
      }
    
  return (
    <MaxWidthWrapper>
      <Overview  />
      <CardsContainer /> 
      <ClientHeader onAddOrUpdate={handleAddOrUpdate} />
      <ClientTable data={data} onRowClick={handleRowClick} />
    </MaxWidthWrapper>
  )
}

export default clients