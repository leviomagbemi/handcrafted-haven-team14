import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={`bg-green text-tan text-opacity-99 w-but text-xl font-bold py-2 px-2 my-10 rounded focus:outline-none focus:shadow-outline ${className}`}
        >
            {children}
        </button>
    );
}
