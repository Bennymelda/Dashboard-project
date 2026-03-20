// components/Button.tsx

import type { FC, ButtonHTMLAttributes } from "react";

import clsx from "clsx";



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

variant?: "primary" | "secondary" | "outline" | "goot" | "cit" | "lop" | "box" | "d" | "gop";

size?: "sm" | "md" | "lg" | "sz" | "bi" | "car" | "kop" | "lit" | "al" | "new" | "n";
shape?: "default" | "full";
};



const Button: FC<ButtonProps> = ({

children,

variant = "primary",
shape="default",
size = "md",

className,

...props

}) => {

const base = "font-semibold rounded-lg transition-colors focus:outline-none  focus:ring-offset-2";



const variants = {

primary: "bg-[var(--button)] rounded  text-white focus:ring-[var(--button)] cursor-pointer",

secondary: "text-zinc-600  rounded cursor-pointer",
gop:"text-[var(--button)] ",
outline: "border border-[var(--button)]  text-purple-700 hover:bg-purple-100 focus:ring-purple-500 cursor-pointer",
goot:"bg-red-500 text-white cursor-pointer",
cit:"bg-gray-300 cursor-pointer",
lop:"bg-[var(--button)]  text-white  ",
box:'bg-[var(--bg-color)]   border-2 border-[var(--border)]  text-[var(--text)]  rounded-full',
d:'bg-white border-2 border-red-200 text-black rounded-full'


};


const shapes={
    default:"rounded-full",
    full:"rounded-md"
};
const sizes = {

sm: "px-4 py-2 text-normal",

md: "px-6 py-2 rounded-lg font-bold",
new:"font-bold text-lg px-2 py-1 rounded flex-1",
lg: " px-6 rounded cursor-pointer font-bold text-white py-2 ",
sz:"font-semibold text-2xl cursor-pointer",
bi: "px-2 py-1 rounded mt-2",
car:"font-bold text-lg px-6 py-2 ",
kop:"text-sm font-bold",
lit:" px-3 py-1 rounded",
al:"px-3 py-1 rounded",
n:"px-8  flex py-2 rounded-full"
};



return (

<button className={clsx(base, variants[variant], shapes[shape], sizes[size], className)} {...props}>

{children}

</button>

);

};



export default Button;

