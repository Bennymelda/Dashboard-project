import { useState, memo,useEffect,useRef } from "react";
import type { CardType } from "../types";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

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
    id: uuidv4(),
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

  return (
    <div className="fixed inset-0 overflow-x-auto space-x-4 flex items-center justify-center bg-black/40 z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded w-96" onClick={(e) => e.stopPropagation()} ref={cardModalRef}>
        <h2 className="text-lg font-bold mb-2">{existingCard ? "Edit Card" : "New Card"}</h2>
        <div className=" flex flex-col gap-1 mb-1">
          <label htmlFor=""  className="font-bold text-lg">Card Title</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 outline-none focus:ring-1 text-lg focus:ring-purple-700  focus:border-purple-700 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl border-gray-300 px-4 py-3"
            ref={firstCardInputRef}
        />
        </div>
        <div className="flex flex-col gap-1 mb-1">
          <label htmlFor=""  className="font-bold text-lg">Description</label>
          <textarea
          placeholder="Description (Markdown supported)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 outline-none focus:ring-1 text-lg focus:ring-purple-700  focus:border-purple-700 h-20 w-full mb-2 bg-gray-50  border-2 mt-1 rounded-xl border-gray-300 px-4 py-3"

        />
        </div>
        <div className="flex flex-col gap-1 mb-2">
  <label className="font-bold text-lg">Tags</label>

  {/* Show current tags as pills */}
  <div className="flex flex-wrap gap-2 mb-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full flex items-center gap-1"
      >
        {tag}
        <button
          type="button"
          onClick={() => setTags(tags.filter((t) => t !== tag))}
          className="text-sm font-bold"
        >
          ×
        </button>
      </span>
    ))}
  </div>

  {/* Input for new tag */}
  <input
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
        setTagInput(""); // clear input after adding
      }
      if (e.key === "Backspace" && tagInput === "") {
        setTags(tags.slice(0, -1)); // delete last tag
      }
    }}
    className="outline-none focus:ring-1 text-lg focus:ring-purple-700 focus:border-purple-700 p-2 w-full bg-gray-50 border-2 rounded-xl border-gray-300 px-4 py-3"
  />
</div>

        <div className="flex flex-col gap-1 mb-1">
          <label htmlFor=""  className="font-bold text-lg">Due Date</label>
          <input
          type="date"
          value={dueDate || ""}
          onChange={(e) => setDueDate(e.target.value)}
         className="outline-none focus:ring-1 text-lg focus:ring-purple-700  focus:border-purple-700 p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl border-gray-300 px-4 py-3"
        />
        </div>

        

        <div className="mb-2">
          <span className="font-semibold text-sm">Preview:</span>
          <div className="p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl border-gray-300 px-4 py-3">
            <ReactMarkdown>{description || "Nothing yet..."}</ReactMarkdown>
          </div>
        </div>
  
        <div className="flex gap-2 justify-end">
          {existingCard && deleteCard && (
            
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          )}
          <div className="flex gap-4">
            <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">
            Cancel
          </button>
          
          <button
                onClick={handleSave}
                className="bg-purple-700 px-4 rounded cursor-pointer font-bold text-white py-2 "
              >
              Create Card
              </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default memo(CardComponent);