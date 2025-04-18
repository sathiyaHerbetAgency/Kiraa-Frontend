'use server'
import { connectMongoDb } from './../lib/mongodb';
import Invoice from './../Models/InvoiceModel';

import Client from './../Models/ClientModel';
export const getErrorMessages = (error) => {
    let message;
    if (error instanceof Error) {
    message = error.message;
    } else if (error && typeof error ==="object" && "message" in error) {
    message =String(error.message);
    } else if (typeof error === "string") {
    message = error;
    } else {
    message = "Something went wrong";
    
    }
}
export const createInvoice =async(formData)=>{
    const {amount, name, customer, status}=formData
        try {
            if (!amount || !customer || !status) {
            return {
            error: "Please fill all the fields"
            };
        };
        await connectMongoDb()
        await Invoice.create({
            customer,
            amount,
            status
        })
        return {
            message:'Invoice Created Successfully'
        }
    }catch(error){
        
    }
}

export const createClients =async(formData)=>{
    console.log(formData)
    const {name, email, address}=formData
        try {
            if (!name || !email || !address) {
            return {
            error: "Please fill all the fields"
            };
        };
        await connectMongoDb()
        await Client.create({
            name,
            email,
            address
        })
        return{
            message:"Invoice Created Successfully"
        }
    }catch(error){
        console.log(error)
        return {
            error:getErrorMessages(error)
        }
    }
}