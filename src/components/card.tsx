import { useState, memo,useEffect,useRef } from "react";
import type { CardType } from "../types";
import ReactMarkdown from "react-markdown";
import Input from "./input";
import Button from "./buttton";
import Textarea from "./Textarea";
interface Props {
  columnId: string;
  addCard: (columnId: string, card: CardType) => void;
  editCard?: (cardId: string, updatedCard: Partial<CardType>) => void;
  deleteCard?: (columnId: string, cardId: string) => void;
  onClose: () => void;
  existingCard?: CardType;
}

function CardComponent({
  columnId,
  addCard,
  editCard,
  deleteCard,
  onClose,
  existingCard,
}: Props) {
  const [title, setTitle] = useState(existingCard?.title || "");
  const [description, setDescription] = useState(existingCard?.description || "");
  const [tags, setTags] = useState<string[]>(existingCard?.tags || []);
const [tagInput, setTagInput] = useState("");
  const [dueDate, setDueDate] = useState(existingCard?.dueDate || "");

  const handleSave = () => {
    if (!title.trim()) return;

    if (existingCard && editCard) {
  editCard(existingCard.id, {
    title,
    description,
    tags,
    dueDate: dueDate || null,
  });
} else {
  addCard(columnId, {
    id: crypto.randomUUID(),
    title,
    description,
    tags,
    dueDate: dueDate || null,
  });
}
    onClose();
  };

  const handleDelete = () => {
    if (existingCard && deleteCard) {
      deleteCard(columnId, existingCard.id);
      onClose();
    }
  };
const firstCardInputRef = useRef<HTMLInputElement>(null);
const cardModalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (firstCardInputRef.current) firstCardInputRef.current.focus();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }

    if (e.key === "Tab" && cardModalRef.current) {
      const focusableEls = cardModalRef.current.querySelectorAll<HTMLElement>(
        "input, textarea, button"
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [onClose]);

const [errors, setErrors] = useState({

title: "",

description: "",

dueDate: "",
tag: "",

});



const validateForm = () => {

const newErrors = {

title: title.trim() ? "" : "No title yet",

description: description.trim() ? "" : "No description yet",

dueDate: dueDate ? "" : "No due date yet",
tag: tagInput.trim() ? "" : "No tag yet",
};



setErrors(newErrors);



return !newErrors.title && !newErrors.description && !newErrors.dueDate && !newErrors.tag;

};



const handleSubmitCard = () => {

if (!validateForm()) return;

handleSave();

};



return (

<div

className="fixed inset-0 overflow-x-auto space-x-4 flex items-center justify-center bg-black/40 z-50"

onClick={onClose}

>

<div

className="bg-[var(--modal)] p-4 rounded w-96"

onClick={(e) => e.stopPropagation()}

ref={cardModalRef}

>

<h2 className="text-lg font-bold mb-2 text-[var(--text)]">

{existingCard ? "Edit Card" : "New Card"}

</h2>



<div className="flex flex-col gap-1 mb-2">

<label className="font-bold text-lg text-[var(--text)] ">Card Title</label>

<Input

type="text"

placeholder="What needs to be done?"

value={title}

onChange={(e) => {

setTitle(e.target.value);

if (errors.title) {

setErrors((prev) => ({ ...prev, title: "" }));

}

}}

variant="primary"

inputSize="sm"

ref={firstCardInputRef}

/>

{errors.title && (

<p className="text-sm text-[var(--errors)] mt-1">{errors.title}</p>

)}

</div>



<div className="flex flex-col gap-1 mb-2">

<label className="font-bold text-lg text-[var(--text)] ">Description</label>

<Textarea

placeholder="Description (Markdown supported)"

value={description}

onChange={(e) => {

setDescription(e.target.value);

if (errors.description) {

setErrors((prev) => ({ ...prev, description: "" }));

}

}}

variant="inner"

textareaSize="sm"

/>

{errors.description && (

<p className="text-sm text-[var(--errors)] mt-1">{errors.description}</p>

)}

</div>



<div className="flex flex-col gap-1 mb-2">

<label className="font-bold text-lg text-[var(--text)]">Tags</label>



<div className="flex flex-wrap gap-2 mb-2">

{tags.map((tag) => (

<span

key={tag}

className="bg-[var(--tag)] text-[var(--button)] px-2 py-1 rounded-full flex items-center gap-1"

>

{tag}

<Button

type="button"

onClick={() => setTags(tags.filter((t) => t !== tag))}

size="kop"

>

×

</Button>

</span>

))}

</div>

{errors.tag && (
  <p className="text-sm text-[var(--errors)] mt-1">{errors.tag}</p>
)}



<Input

type="text"

placeholder="Type tag and press Enter"

value={tagInput}

onChange={(e) => setTagInput(e.target.value)}

onKeyDown={(e) => {

if (e.key === "Enter" && tagInput.trim() !== "") {

e.preventDefault();

if (!tags.includes(tagInput.trim())) {

setTags([...tags, tagInput.trim()]);

}

setTagInput("");

}

if (e.key === "Backspace" && tagInput === "") {

setTags(tags.slice(0, -1));

}

}}

variant="primary"

inputSize="sm"

/>

</div>



<div className="flex flex-col gap-1 mb-2">

<label className="font-bold text-lg text-[var(--text)]">Due Date</label>

<Input

type="date"

value={dueDate || ""}

onChange={(e) => {

setDueDate(e.target.value);

if (errors.dueDate) {

setErrors((prev) => ({ ...prev, dueDate: "" }));

}

}}

variant="primary"

inputSize="sm"

/>

{errors.dueDate && (

<p className="text-sm text-[var(--errors)] mt-1">{errors.dueDate}</p>

)}

</div>



<div className="mb-3">

<span className="font-semibold text-sm">Preview:</span>

<div className="p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl border-gray-300 px-4 py-3">

<ReactMarkdown>{description.trim() || "Nothing yet..."}</ReactMarkdown>

</div>

</div>



<div className="flex gap-2 justify-end">

{existingCard && deleteCard && (

<Button onClick={handleDelete} size="lit" variant="goot">

Delete

</Button>

)}



<div className="flex gap-4">

<Button onClick={onClose} variant="cit" size="al">

Cancel

</Button>



<Button

onClick={handleSubmitCard}

variant="primary"

size="sm"

>

{existingCard ? "Save Changes" : "Create Card"}

</Button>

</div>

</div>

</div>

</div>

);


}

export default memo(CardComponent);