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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
  } from "@/components/ui/select";
import {  toast } from 'react-toastify';
import { createClients } from './../../actions/invoiceActions';
import { ClientSave,ClientDatas } from './../../Api/ClientApi/Api';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema =z.object({
    name: z.string().min(2, {
    message: "Name is required.",
    }),
    email: z.string() .min(2,{
    message: "Email is required.",
    }),
    address: z.string() .min(2,{
        message: "Address is required.",
    }),
    })
export const CreateClient = ({ onAddOrUpdate }) => {
    const [open,setOpen]=useState(false)
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
         name: "",
         email:'',
         address:'',
        },
      })
      const isLoading = form.formState.isSubmitting;
        // 2. Define a submit handler.
        const generateFourDigitId = () => {
          const uuid = uuidv4(); // Generate a full UUID
          return uuid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5); // Remove dashes and slice the first 4 characters
        };
 async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const {name, email, address}=values
    const data={
      client_name:name,
      client_email:email,
      client_address:address,
      client_id:generateFourDigitId(),
    }
    
        
      console.log(data)
        const res=await ClientSave(data)
       console.log(res)
      if(res?.status===200){
        onAddOrUpdate(data);
        toast.success("Successfully Submited")
        setOpen(false)
      }else{
        toast.error("Error Please Try Again")
      }
    
    
   }

  return (
    <div>
        <Action
        title="Create Invoice"
        desc="Create a new invoice"
        trigger={
            <Button className=" space-x-1 bg-[#00000080] rounded-[100px] border px-4 py-2 hover:bg-[#00000080] text-white" >
                <span>Create Client</span>

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
                <FormControl>
                <Input placeholder="Client Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
                <FormControl>
                <Input placeholder="Client Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
                <FormControl>
                <Textarea placeholder="Client Address" {...field} />
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
