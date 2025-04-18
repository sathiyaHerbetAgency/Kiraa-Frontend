import React,{useState} from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CalendarInput from './CalendarInput';
import StatusSwitch from './StatusSwitch';

const InvoiceFields = ({ form, onSubmit, date, setDate }) => {
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField control={form.control} name="inv_service" render={({ field }) => (
          <FormItem>
            <FormLabel>Service</FormLabel>
            <FormControl>
              <Input placeholder="Enter the Service" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
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
        {/* Other Form Fields */}
        <CalendarInput date={date} setDate={setDate} />
        <StatusSwitch form={form} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default InvoiceFields;
