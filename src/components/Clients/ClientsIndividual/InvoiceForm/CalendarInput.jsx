import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const CalendarInput = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const formattedDate = date ? format(date, "dd / MM / yyyy") : "Pick a date";

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="bg-white absolute top-[20px]">
          <Calendar mode="single" selected={date} onSelect={handleSelect} />
        </div>
      )}
      <Button variant={"outline"} type="button" onClick={() => setIsOpen(!isOpen)}>
        {formattedDate}
      </Button>
    </div>
  );
};

export default CalendarInput;
