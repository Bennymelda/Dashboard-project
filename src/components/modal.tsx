// components/Modal.tsx

import type { FC, ReactNode } from "react";

import clsx from "clsx";



type ModalProps = {

isOpen: boolean;

onClose: () => void;

children: ReactNode;

size?: "sm" | "md" | "lg";

title?: string;

};



const Modal: FC<ModalProps> = ({ isOpen, onClose, children, size = "md", title }) => {

if (!isOpen) return null;



const sizeClasses = {

sm: "w-80",

md: "w-96",

lg: "w-[500px]",

};



return (

<div

className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"

onClick={onClose} // click outside to close

>

<div

className={clsx("bg-[var(--modal)]  p-6 rounded-lg", sizeClasses[size])}

onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside

>

{title && (

<div className="flex justify-between items-center mb-4">

<h2 className="text-xl font-bold text-[var(--text)] ">{title}</h2>

<button

onClick={onClose}

className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"

>

✕

</button>

</div>

)}

<div>{children}</div>

</div>

</div>

);

};



export default Modal;