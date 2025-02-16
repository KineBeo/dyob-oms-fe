import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import "react-datepicker/dist/react-datepicker.css";

export interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null, event?: React.SyntheticEvent<any, Event> | undefined) => void;
    placeholderText?: string;
    className?: string;
    showTimeSelect?: boolean;
    minDate?: Date;
    maxDate?: Date;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, placeholder }, ref) => (
        <Button
            variant="outline"
            onClick={onClick}
            ref={ref}
            className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
            )}
        >
            <Calendar className="mr-2 w-4 h-4" />
            {value || placeholder || "Chọn ngày"}
        </Button>
    )
);

CustomInput.displayName = "CustomInput";

export function DatePicker({
    selected,
    onChange,
    placeholderText,
    className,
    showTimeSelect = false,
    minDate,
    maxDate,
}: DatePickerProps): JSX.Element {
    // Wrapper function to handle the onChange event
    const handleChange = (date: Date | null, event?: React.SyntheticEvent<any, Event>) => {
        onChange(date, event);
    };

    return (
        <div className={className}>
            <ReactDatePicker
                selected={selected}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                showTimeSelect={showTimeSelect}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={placeholderText}
                customInput={<CustomInput placeholder={placeholderText} />}
                wrapperClassName="w-full"
                popperClassName="react-datepicker-popper"
                popperPlacement="bottom-start"
                showPopperArrow={false}
                calendarClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4"
                dayClassName={(date: Date) =>
                    cn(
                        "rounded hover:bg-gray-100 dark:hover:bg-gray-700",
                        {
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
                                date.toDateString() === selected?.toDateString(),
                        }
                    )
                }
            />
        </div>
    );
}

export default DatePicker;