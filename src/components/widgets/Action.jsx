import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Action = ({
  children,
  trigger,
  title,
  desc,
  btnText,
  onClick,
  open,
  setOpen,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto ">{children}</div>
        <AlertDialogFooter className="border-t pt-6 ">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {btnText && (
            <AlertDialogAction onClick={onClick}>{btnText}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Action;
