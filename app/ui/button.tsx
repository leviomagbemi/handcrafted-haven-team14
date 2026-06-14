import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={`bg-green text-tan text-opacity-99 w-but text-xl font-bold py-2 px-2 my-10 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}
