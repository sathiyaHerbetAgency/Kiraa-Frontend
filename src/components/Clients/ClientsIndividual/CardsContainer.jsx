import React from 'react'
import CardTemplate from './../../CardTemplate/CardTemplate';

const CardsContainer = () => {
  const card1=
  {"Paid invoices":"427",
  "Total Paid":"59,287"
  }
  const card2=
  {"unpaid invoices":"18",
    "Total UnPaid":"10432"
  } 
  const card3=
  {"Clients":"20"}
  return (
    <div className="flex items-stretch min-w-full gap-4 mt-6">
    <div className="  w-[50%] h-full">
      <CardTemplate  data={card1}/>
    </div>
    <div className="  w-[50%] h-full">
      <CardTemplate  data={card2}/>
    </div> 
   
  </div>

  )
}

export default CardsContainer