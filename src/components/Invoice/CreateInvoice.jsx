'use client'
import Action from './../widgets/Action';
import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingButton } from './../widgets/Loader';
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
  } from "@/components/ui/select";
  import { useEffect } from 'react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  const customers = [
    {
    id: 1,
    name: "Akpareva Zino",
    image: "https://i.pravatar.cc/300?u=a0425ẞ1f4e29026702d",
    email: "donaldzee.ng@gmail.com",
    },
    {
    id: 2,
    name: "Jane Doe",
    image: "https://i.pravatar.cc/300?u-a042581f4e29026703d",
    email: "janedoe@example.com"
    },
]
const formSchema =z.object({
    name: z.string().min(2, {
    message: "Name is required.",
    }),
    status: z.string() .min(2,{
    message: "Name is required.",
    }),
    amount: z.string() .min(2,{
        message: "Name is required.",
    }),
})

export const CreateInvoice = () => {
    const [open,setOpen]=useState(false)
// useEffect(()=>{
// console.log("started")
// console.log(process.env.NEXT_PUBLIC_NAME)
// },[])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          amount:'',
          status:'unpaid',
        },
      })
      const isLoading = form.formState.isSubmitting;
        // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const {name, amount, status}=values
    console.log(values)
  }

  return (
    <div>
        <Action
        title="Create Invoice"
        desc="Create a new invoice"
        trigger={
            <Button className="text-white space-x-1" >
                <span>Create Invoice</span>
                <span className="text-lg">+</span>
                </Button>
        }
        open={open}
        setOpen={setOpen}
        >
           {/* Childrem */}
           <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Select className="w-full" onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Customer</SelectLabel>
                      <>
                      {customers?.map((item)=>{
                        const {name}=item;
                        return(
                          <SelectItem Key={item.id} value={name}>{name}</SelectItem>
                        )
                      })}
                      </>
                    </SelectGroup>
                 
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                   <FormLabel>Status</FormLabel>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Unpaid" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     UnPaid
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Paid" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Paid
                    </FormLabel>
                  </FormItem>
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {isLoading?( <LoadingButton btnText={"Loading"} btnClass="w-full" btnVariant={'outline'} /> ) :
          (<Button type="submit">Submit</Button>)
        } */}
        <Button type="submit">Submit</Button>
      </form>
      </Form>
        </Action>
    </div>
  )
}
