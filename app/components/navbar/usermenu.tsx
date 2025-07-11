'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../avatar"
import { useCallback, useEffect, useRef, useState } from "react" // Added useRef and useEffect
import MenuItem from "./menuitem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    
    // Create refs for menu and toggle button
    const menuRef = useRef<HTMLDivElement>(null)
    const toggleRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && 
                !menuRef.current?.contains(event.target as Node) && 
                !toggleRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) return loginModal.onOpen()
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    RentEase your home
                </div>
                {/* Added toggleRef to the menu button */}
                <div 
                    ref={toggleRef}
                    onClick={toggleOpen} 
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            
            {isOpen && (
                // Added menuRef to the dropdown
                <div ref={menuRef} className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>                  
                                <MenuItem onClick={() => {
                                    router.push('/trips')
                                    setIsOpen(false)
                                }} label="My Trips"/>
                                <MenuItem onClick={() => {
                                    router.push('/favorites')
                                    setIsOpen(false)
                                }} label="My Favorites"/>
                                <MenuItem onClick={() => {
                                    router.push('/reservations')
                                    setIsOpen(false)
                                }} label="My Reservations"/>
                                <MenuItem onClick={() => {
                                    router.push('/properties')
                                    setIsOpen(false)
                                }} label="My Properties"/>
                                <MenuItem onClick={() => {
                                    rentModal.onOpen()
                                    setIsOpen(false)
                                }} label="Airbnb My Home"/>
                                <hr />
                                <MenuItem onClick={() => {
                                    signOut()
                                    setIsOpen(false)
                                }} label="Logout"/>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={() => {
                                    loginModal.onOpen()
                                    setIsOpen(false)
                                }} label="Login"/>
                                <MenuItem onClick={() => {
                                    registerModal.onOpen()
                                    setIsOpen(false)
                                }} label="Sign up"/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu