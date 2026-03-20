import { forwardRef} from "react";
import type {  InputHTMLAttributes } from "react";
import clsx from "clsx";



type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {

inputSize?: "sm" | "md" | "lg";

variant?: "primary" | "secondary";

};



const Input = forwardRef<HTMLInputElement, InputProps>(

({ inputSize = "md", variant = "primary", className, ...props }, ref) => {

const base = "focus:border-[var(--button)] outline-none focus:ring-1 focus:ring-[var(--button)]";

const variants = {

primary: "bg-[var(--input-bg)] border-2 rounded border-[var(--border)] text-[var(--text)]",

secondary: "border-gray-500 bg-gray-50 text-gray-800 focus:ring-gray-500",

};

const sizes = {

sm: "p-2 w-full mb-2 mt-2 px-4 py-3 text-sm font-normal",

md: "px-3 py-2 text-md",

lg: "px-4 py-3 text-lg",

};



return <input ref={ref} className={clsx(base, variants[variant], sizes[inputSize], className)} {...props} />;

}

);



Input.displayName = "Input"; // Good for DevTools

export default Input;