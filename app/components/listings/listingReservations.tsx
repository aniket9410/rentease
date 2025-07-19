'use client';

import { Range } from "react-date-range";
import Calendar from "../inputs/calendar";
import Button from "../button";



interface ListingReservationsProps {
    price: number
    dateRange: Range
    totalPrice: number
    onChangeDate: (value: Range) => void;
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]
}

const ListingReservations: React.FC<ListingReservationsProps> = ({
    price, 
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return ( 
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    ₹{price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />

            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button 
                    onClick={onSubmit}
                    disabled={disabled}
                    label="Reserve"
                />
                
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold">
                <div>
                    Total
                </div>
                <div>
                    ₹{totalPrice}
                </div>

            </div>
        </div>
     );
}
 
export default ListingReservations;