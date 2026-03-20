
import { useState } from "react";
import Textarea from "./Textarea";

import Button from "./buttton";
type Props = {

cardId: string;

addComment: (cardId: string, text: string) => void; // 🔹 add this

};



export default function CommentInput({ cardId, addComment }: Props) {

const [text, setText] = useState("");



const handleSubmit = () => {

if (!text.trim()) return;

addComment(cardId, text); // call the function from props

setText(""); // clear input

};



return (
<div

className="bg-[var(--card)] text-[var(--text)] border-[var(--border)] mt-4 mx-2 p-3 rounded-2xl border shadow-sm"



>

<Textarea

value={text}

placeholder="Add a comment..."

onChange={(e) => setText(e.target.value)}

variant="inner"

textareaSize="sm"

style={{


}}

/>

<br />


<div className="flex justify-end">
<Button

onClick={handleSubmit}
variant="primary"
size="sm"



>

Add comment

</Button>
</div>


</div>

);

}
