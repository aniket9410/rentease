'use client'

import Modal from "./modal";

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useMemo, useState } from "react";

import { Range } from 'react-date-range';
import { CountrySelectValue } from "../inputs/countrySelect";
import qs from 'query-string';
import { format } from "path";
import { formatISO } from "date-fns";
import Heading from "../heading";
import Calendar from "../inputs/calendar";
import Counter from "../inputs/counter";
import CountrySelect from "../inputs/countrySelect";



enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
    
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter();

    const params = useSearchParams();
    const [step, setStep] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(()=> dynamic(() => import('../map'), {
        ssr: false
    }), [location]);

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
        
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
             title="Where do you want to go?"
             subtitle="Find the perfect location!"
            />
            <CountrySelect
             value={location}
             onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                 title="When do you plan to go?"
                 subtitle="Make sure everyone is free!"
                />
                <Calendar
                 value={dateRange}
                 onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                 title="More information"
                 subtitle="Find your perfect place!"
                />
                <Counter
                 title="Guests"
                 subtitle="How many guests are coming?"
                 value={guestCount}
                 onChange={(value) => setGuestCount(value)}
                />
                <Counter
                 title="Rooms"
                 subtitle="How many rooms do you need?"
                 value={roomCount}
                 onChange={(value) => setRoomCount(value)}
                />
                <Counter
                 title="Bathrooms"
                 subtitle="How many bathrooms do you need?"
                 value={bathroomCount}
                 onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return ( 
        <Modal
         isOpen={searchModal.isOpen}
         onClose={searchModal.onClose}
         onSubmit={onSubmit}
         title="Filters"
         actionLabel={actionLabel}
         secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
         secondaryActionLabel={secondaryActionLabel}
         body={bodyContent}
         />
     );
}
 
export default SearchModal;