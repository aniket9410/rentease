'use client'

import { PuffLoader } from "react-spinners"


const Loader = () => {
    return (
        <div className="flex items-center justify-center h-full">
                <PuffLoader size={40} color="red" />
        </div>
    )
}

export default Loader