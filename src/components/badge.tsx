// components/Badge.tsx

import type { FC } from "react";

import clsx from "clsx";



type BadgeProps = {

children: string | number;

variant?: "primary" | "secondary" | "success" | "warning" | "danger";

size?: "sm" | "md" | "lg";

};



const Badge: FC<BadgeProps> = ({

children,

variant = "primary",

size = "md",

}) => {

const base = "inline-block font-semibold rounded-full text-center";



const variants = {

primary: "bg-[var(--tags)] text-white dark:bg-purple-600 dark:text-white ",

secondary: "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100",

success: "bg-green-500 text-white dark:bg-green-600",

warning: "bg-yellow-400 text-gray-900 dark:bg-yellow-500",

danger: "bg-red-500 text-white dark:bg-red-600",

};



const sizes = {

sm: "px-2 py-1 text-xs mb-4",

md: "px-4 py-1 text-sm",

lg: "px-4 py-2 text-md",

};



return (

<span className={clsx(base, variants[variant], sizes[size])}>

{children}

</span>

);

};



export default Badge;