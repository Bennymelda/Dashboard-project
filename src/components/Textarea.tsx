// components/Textarea.tsx

import { forwardRef } from "react";
import type {  TextareaHTMLAttributes } from "react";
import clsx from "clsx";



type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {

textareaSize?: "sm" | "md" | "lg";

variant?: "primary" | "secondary" |"inner";

};



const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(

({ textareaSize = "md", variant = "primary", className, ...props }, ref) => {

const base = "focus:border-[var(--button)] outline-none focus:ring-1 focus:ring-[var(--button)] resize-none";



const variants = {

primary: "bg-gray-50 border-2 rounded border-gray-300",

secondary: "border-gray-500 bg-gray-50 text-gray-800 focus:ring-gray-500",
inner:"bg-[var(--input-bg)] text-[var(--text)] border-2 border-[var(--border)]  rounded-[14px]",

};



const sizes = {

sm:  "p-2 w-full mb-2 mt-2 px-4 py-4 text-sm",

md: "px-3 py-2 text-md",

lg: "px-4 py-3 text-lg",

};



return (

<textarea

ref={ref}

className={clsx(base, variants[variant], sizes[textareaSize], className)}

{...props}

/>

);

}

);



Textarea.displayName = "Textarea";



export default Textarea;