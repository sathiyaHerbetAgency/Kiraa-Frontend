/* eslint-disable */
import React from 'react'
import {CssVariables} from '@/components/CssVariable/ComponentCss'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CurrencyFormatter from './../Functions/CurrencyFormater';

const CardTemplate = ({data}) => {
  return (
    <div className="h-full">
        <Card className="h-full pt-6 border border-[#00000033]">
        {Object.entries(data).map(([key,value])=>
        <CardContent>
          <div className="flex gap-6">
          <CardTitle className={CssVariables.cardTitleClass}>{key}</CardTitle>
          {key.toLowerCase().includes("total") &&  <CardTitle className={` ${CssVariables.cardTitleClass}  font-[LexendDeca-600]`}>MYR</CardTitle>}
          </div>
          <CardDescription className={CssVariables.cardText}> {key.toLowerCase().includes("total") ? <CurrencyFormatter amount={value}/> : value}  </CardDescription>
        </CardContent>
         )}
        </Card>
    </div>
  )
}

export default CardTemplate