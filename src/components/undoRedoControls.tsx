// UndoRedoControls.tsx
/*
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./buttton";
export const UndoRedoControls = () => {
const context = useContext(AppContext);



// 2️⃣ Early return if context is missing

if (!context) return null;
const { undo, redo, undoStack, redoStack } = context;



return (

<div className="flex gap-2 ">

<Button onClick={undo} disabled={undoStack.length === 0} variant="primary" >

Undo

</Button>

<Button onClick={redo} disabled={redoStack.length === 0} variant="d">

Redo

</Button>

</div>

);

};
*/

import { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";

import Button from "./buttton";



export const UndoRedoControls = () => {

const context = useContext(AppContext);



if (!context) return null;

const { undo, redo, undoStack, redoStack } = context;



// Keyboard shortcuts

useEffect(() => {

const handleKeyDown = (e: KeyboardEvent) => {

// For Windows/Linux: Ctrl + Z

// For Mac: Meta + Z

const isUndo = (e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey;

const isRedo = ((e.ctrlKey || e.metaKey) && e.key === "y") || // Ctrl+Y

((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Z"); // Ctrl+Shift+Z or Cmd+Shift+Z



if (isUndo) {

e.preventDefault(); // prevent browser undo

if (undoStack.length > 0 && typeof undo === "function") undo();

}



if (isRedo) {

e.preventDefault(); // prevent browser redo

if (redoStack.length > 0 && typeof redo === "function") redo();

}

};



window.addEventListener("keydown", handleKeyDown);



return () => {

window.removeEventListener("keydown", handleKeyDown);

};

}, [undo, redo, undoStack.length, redoStack.length]);



return (

<div className="flex gap-2">

<Button

onClick={undo}

disabled={undoStack.length === 0}

variant="primary"

>

Undo

</Button>



<Button

onClick={redo}

disabled={redoStack.length === 0}

variant="primary"

>

Redo

</Button>

</div>

);

};