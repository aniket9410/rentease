'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white border-black text-black' : 'bg-cyan-500 border-cyan-500 text-white'} ${small ? 'border-[1px] text-sm font-light' : 'border-2 text-md font-semibold'}`}>
            {Icon && (
                <Icon size={24} className="absolute left-4 top-0" />
            )}
            {label}
        </button>
    )

}
 
export default Button;