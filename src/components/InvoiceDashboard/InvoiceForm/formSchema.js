import { z } from "zod";

export const formSchema = z.object({
  inv_service: z.string().min(2, { message: "Service Name is required." }),
  inv_description: z.string().min(1, { message: "Description is required." }),
  inv_due_amount: z.string().min(1, { message: "Due amount is required." }),
  inv_tax_amount: z.string().min(1, { message: "Tax amount is required." }),
  inv_status: z.boolean().refine(value => typeof value === 'boolean', { message: "Invoice status is required" }),
  inv_qty: z.string().min(1, { message: "Quantity is required." }),
  client_name: z.string().min(2, {
    message: "Name is required.",
    }),
    client_email: z.string() .min(2,{
    message: "Email is required.",
    }),
    client_address: z.string() .min(2,{
        message: "Address is required.",
    }),
    
});
