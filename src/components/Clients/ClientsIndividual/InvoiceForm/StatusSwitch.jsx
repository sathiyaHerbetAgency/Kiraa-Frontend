import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import clsx from "clsx";

const StatusSwitch = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="inv_status"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Status</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-2">
              <span className={clsx(!field.value && "text-red-600")}>Unpaid</span>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span className={clsx(field.value && "text-green-600")}>Paid</span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StatusSwitch;
