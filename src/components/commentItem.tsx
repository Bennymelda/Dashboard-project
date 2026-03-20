
/*
import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import Input from "./input";
import Button from "./buttton";
import { FaTrash} from "react-icons/fa";
import { MdEdit} from "react-icons/md";
type Props = {

commentId: string;

};



const CommentItemComponent = ({ commentId }: Props) => {

const [showReply, setShowReply] = useState(false);

const [replyText, setReplyText] = useState("");

const [isEditing, setIsEditing] = useState(false);

const [editText, setEditText] = useState("");



const context = useContext(AppContext);

if (!context) return null;



const { comments, replyToComment, editComment, deleteComment } = context;

const comment = comments[commentId];

if (!comment) return null;



useEffect(() => {
  if (!comment) return;

  if (!isEditing) {
    setEditText(comment.text);
  }
}, [comment?.text, isEditing]);



const handleReply = () => {

if (!replyText.trim()) return;

replyToComment(commentId, replyText);

setReplyText("");

setShowReply(false);

};



const handleEdit = () => {

if (!editText.trim()) return;

editComment(commentId, editText);

setIsEditing(false);

};



const handleDelete = () => {

deleteComment(commentId);

};


return (

<div

style={{

marginLeft: "20px",

borderLeft: "2px solid var(--border)",

paddingLeft: "12px",

marginTop: "10px",

}}

>

<div

style={{

background: "var(--card)",

border: "1px solid var(--border)",

borderRadius: "16px",

padding: "12px",

color: "var(--text)",

boxShadow: "0 6px 18px rgba(0,0,0,0.08)",

}}

>

{isEditing ? (

<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

<Input

type="text"

value={editText}

onChange={(e) => setEditText(e.target.value)}

variant="primary"

inputSize="sm"



/>



<div

style={{

display: "flex",

flexWrap: "wrap",

gap: "8px",

}}

>

<Button

onClick={handleEdit}

variant="box"
size="n"

>

Save

</Button>



<Button

onClick={() => setIsEditing(false)}
variant="primary"
size="n"

>

Cancel

</Button>

</div>

</div>

) : (

<p
className="text-[var(--text)]  font-normal"

>

{comment.text}

</p>

)}



<div className="flex justify-between mt-5">

<Button onClick={() => setShowReply(!showReply)} 
variant="box" size="n" shape="default"
style={{
borderRadius: "999px",
}}
>

Reply

</Button>

<div className="flex items-center gap-4">
{!isEditing && (
<MdEdit onClick={() => setIsEditing(true)} className="text-gray-500 text-xl"/>


)}
<FaTrash onClick={handleDelete} className="  block text-red-500 cursor-pointer" />
 
</div>





</div>



{showReply && (

<div

className="mt-5 bg-[var(--bg-color)] border border-[var(--border)] p-2 rounded-4"


>

<Input

type="text"

value={replyText}

onChange={(e) => setReplyText(e.target.value)}

variant="primary"

inputSize="sm"

placeholder="Write a reply..."

/>



<div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>

<Button onClick={handleReply} size="new" variant="lop">

Send

</Button>

</div>

</div>

)}

</div>



<div style={{ marginTop: "10px" }}>

{comment.replyIds.map((replyId) => (

<CommentItem key={replyId} commentId={replyId} />

))}

</div>

</div>

);
};



// ✅ Wrap component in React.memo to avoid unnecessary re-renders

export const CommentItem = React.memo(CommentItemComponent, (prev, next) => {

// Only re-render if the commentId changes

return prev.commentId === next.commentId;

});
*/

import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";

import Input from "./input";

import Button from "./buttton";

import { FaTrash } from "react-icons/fa";

import { MdEdit } from "react-icons/md";



type Props = {

commentId: string;

};



const CommentItemComponent = ({ commentId }: Props) => {

const [showReply, setShowReply] = useState(false);

const [replyText, setReplyText] = useState("");

const [isEditing, setIsEditing] = useState(false);

const [editText, setEditText] = useState("");



const context = useContext(AppContext);

if (!context) return null;



const { comments, replyToComment, editComment, deleteComment } = context;

const comment = comments[commentId];

if (!comment) return null;



useEffect(() => {

if (!comment) return;

if (!isEditing) {

setEditText(comment.text);

}

}, [comment?.text, isEditing]);



const handleReply = () => {

if (!replyText.trim()) return;

replyToComment(commentId, replyText);

setReplyText("");

setShowReply(false);

};



const handleEdit = () => {

if (!editText.trim()) return;

editComment(commentId, editText);

setIsEditing(false);

};



const handleDelete = () => {

deleteComment(commentId);

};



// Format comment date + time

const formattedDate = new Date(comment.createdAt).toLocaleString();



return (

<div

style={{

marginLeft: "20px",

borderLeft: "2px solid var(--border)",

paddingLeft: "12px",

marginTop: "10px",

}}

>

<div

style={{

background: "var(--card)",

border: "1px solid var(--border)",

borderRadius: "16px",

padding: "12px",

color: "var(--text)",

boxShadow: "0 6px 18px rgba(0,0,0,0.08)",

}}

>

{isEditing ? (

<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

<Input

type="text"

value={editText}

onChange={(e) => setEditText(e.target.value)}

variant="primary"

inputSize="sm"

/>

<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>

<Button onClick={handleEdit} variant="box" size="n">

Save

</Button>

<Button onClick={() => setIsEditing(false)} variant="primary" size="n">

Cancel

</Button>

</div>

</div>

) : (

<>



<p className="text-sm text-gray-500 font-normal">{formattedDate}</p> {/* <-- date + time */}
<p className="text-[var(--text)] font-normal">{comment.text}</p>
</>

)}



<div className="flex justify-between mt-5">

<Button

onClick={() => setShowReply(!showReply)}

variant="box"

size="n"

shape="default"

style={{ borderRadius: "999px" }}

>

Reply

</Button>



<div className="flex items-center gap-4">

{!isEditing && <MdEdit onClick={() => setIsEditing(true)} className="text-gray-500 text-xl" />}

<FaTrash onClick={handleDelete} className="block text-red-500 cursor-pointer" />

</div>

</div>



{showReply && (

<div className="mt-5 bg-[var(--bg-color)] border border-[var(--border)] p-2 rounded-4">

<Input

type="text"

value={replyText}

onChange={(e) => setReplyText(e.target.value)}

variant="primary"

inputSize="sm"

placeholder="Write a reply..."

/>

<div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>

<Button onClick={handleReply} size="new" variant="lop">

Send

</Button>

</div>

</div>

)}

</div>



{/* Render replies recursively */}

<div style={{ marginTop: "10px" }}>

{comment.replyIds.map((replyId) => {

const reply = comments[replyId];

if (!reply) return null;

//const formattedReplyDate = new Date(reply.createdAt).toLocaleString();



return (

  
//<p className="text-sm text-gray-900">{formattedReplyDate}</p> {/* reply date + time */}
<div key={replyId} style={{ marginLeft: "20px", marginTop: "10px" }}>

<CommentItemComponent commentId={replyId} />


</div>



);

})}

</div>

</div>

);

};



// ✅ Wrap component in React.memo to avoid unnecessary re-renders

export const CommentItem = React.memo(CommentItemComponent, (prev, next) => prev.commentId === next.commentId);