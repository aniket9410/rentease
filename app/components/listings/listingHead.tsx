'use client'

import { SafeListing, SafeUser } from "@/app/types"
import React from "react"
import Heading from "../heading"
import useCountries from "@/app/hooks/useCountries"
import Image from "next/image"
import HeartButton from "../heartbutton"

interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries()
    const location = getByValue(locationValue)
    return (
        <>

            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`} 
            />

            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}
 
export default ListingHead;