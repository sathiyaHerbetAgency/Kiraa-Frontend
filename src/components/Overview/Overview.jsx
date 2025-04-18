import React from 'react'
import { Button } from "@/components/ui/button"
const Overview = () => {
    const titleClass="font-[Inter-Semibold] text-[22.75px] leading-[17px] tracking-[-2%]"
    const cardTitleClass="font-[LexendDeca-400] text-[12.75px] leading-[17px] tracking-[-2%]"
  return (
    <div>
        <div className="flex justify-between w-full">
            <h2 className={titleClass}>Overview</h2>
            <Button className="bg-transparent border rounded-3xl text-black border-[#00000033] px-[44px]">Last 30 Days</Button>
        </div>
    </div>
  )
}

export default Overview