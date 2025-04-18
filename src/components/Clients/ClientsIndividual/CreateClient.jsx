"use client";
import Action from "./../../widgets/Action";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "./../../widgets/Loader";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { createClients } from "./../../../actions/invoiceActions";
import { ClientSave, ClientDatas } from "./../../../Api/ClientApi/Api";
import { InvoiceSave } from "./../../../Api/InvoiceApi/Api";
import { usePathname } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import Calendar from "react-calendar";
import { Calendar } from "@/components/ui/calendar";
import "react-calendar/dist/Calendar.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  inv_service: z.string().min(2, {
    message: "Service Name is required.",
  }),
  inv_description: z.string().min(1, {
    message: "Description is required.",
  }),
  inv_due_amount: z.string().min(1, {
    message: "Due amount is required.",
  }),
  inv_tax_amount: z.string().min(1, {
    message: "Tax amount is required.",
  }),
  inv_status: z.boolean().refine((value) => value === true, {
    message: "Invoice status is required",
  }),
  inv_qty: z.string().min(1, {
    message: "Tax amount is required.",
  }),
});
export const CreateClient = ({ onAddOrUpdate }) => {
  const [open, setOpen] = useState(false);
  // const [date, setDate] = useState(null)
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const segment = pathname.split("/")[2] || "";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inv_service: "",
      inv_description: "",
      inv_due_amount: 0,
      inv_tax_amount: 0,
      inv_qty: 0,
    },
    mode: "onChange",
  });
  const isLoading = form.formState.isSubmitting;
  // 2. Define a submit handler.
  const generateFourDigitId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `inv-${randomNum}`;
  };
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const {
      inv_service,
      inv_description,
      inv_due_amount,
      inv_tax_amount,
      inv_qty,
      inv_status,
    } = values;
    const data = {
      ...values,
      inv_id: generateFourDigitId(),
      client_id: segment,
    };
    const res = await InvoiceSave(data);
    if (res?.status === 200) {
      //onAddOrUpdate(data);
      toast.success("Successfully Submited");
      setOpen(false);
    } else {
      toast.error("Error Please Try Again");
    }
  }
  const handleSelect = (selectedDate) => {
    console.log("Selected Date:", selectedDate);

    setDate(selectedDate);
    setIsOpen(false); // Close the calendar after selecting a date
  };
  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };
  const formattedDate = date ? format(date, "dd / MM / yyyy") : "Pick a date";
  return (
    <div>
      <Action
        title="Create Invoice"
        desc="Create a new invoice"
        trigger={
          <Button className=" space-x-1 bg-[#00000080] rounded-[100px] border px-4 py-2 hover:bg-[#00000080] text-white">
            <span>Create Invoice</span>

            <span className="text-lg">+</span>
          </Button>
        }
        open={open}
        setOpen={setOpen}
      >
        {/* Childrem */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="inv_service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the Service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inv_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="inv_due_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the due amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inv_qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qunatity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Qunatity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="inv_tax_amount"
              className="w-1/2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className=""
                      placeholder="tax amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inv_status"
              className="w-1/2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tax Amount</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={`bg-gray-700 data-[state=checked]:bg-black-500`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              className=""
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <div>
                      {isOpen && (
                        <Card className="bg-white absolute top-[20px]">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleSelect}
                            initialFocus
                          />
                        </Card>
                      )}
                      <Button
                        variant={"outline"}
                        type="button"
                        className={cn(
                          " justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                        onClick={toggleCalendar}
                      >
                        {formattedDate}
                      </Button>
                    </div>
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
  );
};
