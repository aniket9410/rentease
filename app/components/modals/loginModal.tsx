'use client'

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";



const LoginModal = () => {

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })    
        .then((callback) => {
            setIsLoading(false)

            if(callback?.ok) {
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })

    
    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back" subtitle="Login to your account!"/>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
                
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            
            <Button 
                
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')} 
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')} 
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>First time using Airbnb?</div>
                    <div
                        onClick={toggle} 
                        className="text-neutral-500 cursor-pointer hover:underline"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose} 
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            actionLabel="Continue"
            disabled={isLoading}
            body={
                bodyContent
            }
            footer={footerContent}
        />
    )
}

export default LoginModal