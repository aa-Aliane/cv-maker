"use client";

import * as React from "react";
import { format, parse, getYear, setYear, getMonth, setMonth } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const MonthPicker: React.FC<Props> = ({
  className,
  value,
  onChange,
  disabled,
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Parse string "YYYY-MM" to Date object, default to now
  const date = value ? parse(value, "yyyy-MM", new Date()) : new Date();
  
  // Local state for the year we are currently viewing in the picker
  const [viewYear, setViewYear] = React.useState(getYear(date));

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(setYear(new Date(), viewYear), monthIndex);
    onChange(format(newDate, "yyyy-MM"));
    setOpen(false);
  };

  const handlePrevYear = () => setViewYear(prev => prev - 1);
  const handleNextYear = () => setViewYear(prev => prev + 1);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal border-border rounded-md bg-background text-body-md transition-all h-auto py-[8px]",
              !value && "text-muted-foreground",
              disabled &&
                "bg-muted text-muted-foreground/50 cursor-not-allowed hover:bg-muted",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(date, "MMMM yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[280px] p-3"
          align="start"
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={handlePrevYear}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-sm">
              {viewYear}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={handleNextYear}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => {
              const isSelected = value && getMonth(date) === index && getYear(date) === viewYear;
              return (
                <Button
                  key={month}
                  variant={isSelected ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-9 w-full font-normal",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
