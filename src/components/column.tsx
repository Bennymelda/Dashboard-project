import React, { useState, useCallback} from "react";
import type { ColumnType,CardType } from "../types";
import CardComponent from "./card";
import { CardComments } from "./CardComments";
import  CommentInput  from "./CommentInput";
import ReactMarkdown from "react-markdown";
import { FaPlus,FaTrash } from "react-icons/fa";
import { MdEdit} from "react-icons/md";
import Button from "./buttton";
import Input from "./input";
import Badge from "./badge";
interface Props {
  column: ColumnType;
    cards: CardType[]; // pass cards as a prop{column.cardIds.map(id => cards[id])}
  onDeleteColumn: (columnId: string) => void;
  addComment: (cardId: string, text: string) => void; // 🔹 add this
  editColumn: (columnId: string, title: string) => void;
  onCreateCard: (columnId: string) => void; // callback to open card modal or navigate
 addCard: (columnId: string, card: CardType) => void;
 editCard: (cardId: string, updatedCard: Partial<CardType>) => void;
  deleteCard: (columnId: string, cardId: string) => void;
   moveCard: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
  draggedCardId: string | null;
  setDraggedCardId: (id: string | null) => void;
  sourceColumnId: string | null;
  setSourceColumnId: (id: string | null) => void;
  sourceIndex: number | null;
  setSourceIndex: (index: number | null) => void;
  isLoading:boolean
}

function ColumnComponent({ column, onDeleteColumn, editColumn, cards, addCard,editCard,  deleteCard, moveCard, draggedCardId, setDraggedCardId, sourceColumnId, setSourceColumnId, sourceIndex, setSourceIndex,addComment}: Props) {
  const [editingColumn, setEditingColumn] = useState(false);
  const [localColumnTitle, setLocalColumnTitle] = useState(column.title);
    const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
;
  const handleSaveColumn = useCallback(() => {
    editColumn(column.id, localColumnTitle);
    setEditingColumn(false);
  }, [column.id, localColumnTitle, editColumn]);
console.log("Rendering Column:", column.id);


  return (
    <div className="p-4  mx-4 rounded-2xl border-2  flex flex-col  border-[var(--two)] bg-[var(--two)] mb-10 
       mt-10">
        
      {/* Column Title Edit */}
      {editingColumn ? (
        <div className="flex flex-col gap-1 mb-2">
          <Input
            value={localColumnTitle}
            onChange={(e) => setLocalColumnTitle(e.target.value)}
            variant="primary"
            //size="sm"
            
          />
          <div className="flex gap-1">
            <Button
              onClick={handleSaveColumn}
              size="new"
              variant="lop"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setEditingColumn(false);
                setLocalColumnTitle(column.title);
              }}
              
             size="new"
              variant="cit"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (

        <div className=" flex  flex-col justify-between h-full items-center mb-2">
          
          
            <div className="flex  justify-between mb-10  items-center  w-full ">
              <div>
                <h3 className="font-bold text-2xl  text-[var(--text)]">{column.title}</h3>
              </div>
              
            <div className="flex gap-1 items-center ">
          
            <MdEdit onClick={() => setEditingColumn(true)}className="text-gray-500 cursor-pointer text-lg" />
            <FaTrash onClick={() => onDeleteColumn(column.id)} className="text-red-500 cursor-pointer text-lg" />
          </div>

            </div>

          {/*
            <div
            className={`flex w-full flex-col gap-4 mb-2 px-2 min-h-[80px] ${
    cards.length === 0 ? "borde-r-2 border-dashed border-gray-300 rounded-md p-4" : ""
  }`}
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();

    if (draggedCardId !== null && sourceColumnId !== null && sourceIndex !== null) {
      moveCard(
        draggedCardId,
        sourceColumnId,
        column.id,
        sourceIndex,
        0 // insert at start since column is empty
      );

      setDraggedCardId(null);
      setSourceColumnId(null);
      setSourceIndex(null);
    }
  }}>

    {cards.length === 0 ? (

// <-- Empty State -->

<div className="flex flex-col  items-center justify-center py-10 ">

<p className="text-[var(--button)]  text-lg mb-2">No cards yet</p>

<p className="text-[var(--list)] text-sm mb-4">Click below to add your first card</p>



</div>

) : (

// <-- Existing cards -->
  (cards || []).map((card,index) => {

  return (
       <div
   key={card.id}
    className="border-2 pb-8 rounded p-2 bg-[var(--card)]  border-[var(--cards)] "
    draggable
    onDragStart={(e) => {
      e.dataTransfer.effectAllowed = "move";
      setDraggedCardId(card.id);
      setSourceColumnId(column.id);
      setSourceIndex(index);
    }}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent bubbling to column drop
      if (draggedCardId && sourceColumnId && sourceIndex !== null) {
        moveCard(draggedCardId, sourceColumnId, column.id, sourceIndex, index);
        setDraggedCardId(null);
        setSourceColumnId(null);
        setSourceIndex(null);
      }
    }} >
   
      <h4 className="font-bold text-lg mb-4 text-[var(--text)] ">{card.title}</h4>

      <div className="card break-all text-md text-[var(--desc)] p-2 mb-2">
        <ReactMarkdown>{card.description || "Nothing yet..."}</ReactMarkdown>
      </div>

<div className="flex gap-2 mt-2">

{card.tags.map((tag) => (

<Badge key={tag} variant="primary" size="sm">

{tag}

</Badge>

))}

</div>
      {card.dueDate && (
        <Badge variant="secondary">
          {new Date(card.dueDate).toDateString()}
        </Badge>
      )}
   
      <div className="flex mt-4 gap-4 items-center justify-end">
        <MdEdit
          onClick={() => {
            setEditingCard(card);
            setShowCardModal(true);
          }}
          className="text-gray-500 cursor-pointer text-lg"
        />

        <FaTrash
          onClick={() => deleteCard(column.id, card.id)}
          className="text-red-500 cursor-pointer text-lg"
        />
      </div>
      <div>
        <div className="mt-10">
          <CommentInput cardId={card.id} addComment={addComment} />
        </div>
        
         <div className="mt-4 border-[var(--b)]  rounded  py-3 border-2 ">
                
            <CardComments cardId={card.id} />
         </div>
     
      </div>
    
</div>
  );
})

)}



      
          </div>
         */}
<div

className={`flex w-full flex-col gap-4 mb-2 px-2 h-full ${

cards.length === 0 ? "border-2 border-dashed border-gray-300 rounded-md p-4" : ""

}`}

onDragOver={(e) => e.preventDefault()} // allow drop anywhere

onDrop={(e) => {

e.preventDefault();



if (draggedCardId !== null && sourceColumnId !== null && sourceIndex !== null) {

const columnRect = e.currentTarget.getBoundingClientRect();

const offsetY = e.clientY - columnRect.top; // mouse position inside column



// approximate index based on card height (adjust 100 if your card height differs)

const approxIndex = Math.floor(offsetY / 100);

const toIndex = Math.min(Math.max(approxIndex, 0), cards.length);



moveCard(draggedCardId, sourceColumnId, column.id, sourceIndex, toIndex);



setDraggedCardId(null);

setSourceColumnId(null);

setSourceIndex(null);

}

}}

>

{cards.length === 0 ? (

<div className="flex flex-col items-center justify-center py-10">

<p className="text-[var(--button)] text-lg mb-2">No cards yet</p>

<p className="text-[var(--list)] text-sm mb-4">Click below to add your first card</p>

</div>

) : (

(cards || []).map((card, index) => (

<div

key={card.id}

className="border-2 pb-8 rounded p-2 bg-[var(--card)] border-[var(--cards)]"

draggable

onDragStart={(e) => {

e.dataTransfer.effectAllowed = "move";

setDraggedCardId(card.id);

setSourceColumnId(column.id);

setSourceIndex(index);

}}

onDragOver={(e) => e.preventDefault()}

>

<h4 className="font-bold text-lg mb-4 text-[var(--text)]">{card.title}</h4>

<div className="card break-all text-md text-[var(--desc)] p-2 mb-2">

<ReactMarkdown>{card.description || "Nothing yet..."}</ReactMarkdown>

</div>



<div className="flex gap-2 mt-2">

{card.tags.map((tag) => (

<Badge key={tag} variant="primary" size="sm">

{tag}

</Badge>

))}

</div>



{card.dueDate && (

<Badge variant="secondary">

{new Date(card.dueDate).toDateString()}

</Badge>

)}



<div className="flex mt-4 gap-4 items-center justify-end">

<MdEdit

onClick={() => {

setEditingCard(card);

setShowCardModal(true);

}}

className="text-gray-500 cursor-pointer text-lg"

/>

<FaTrash

onClick={() => deleteCard(column.id, card.id)}

className="text-red-500 cursor-pointer text-lg"

/>

</div>



<div className="mt-10">

<CommentInput cardId={card.id} addComment={addComment} />

</div>



<div className="mt-4 border-[var(--b)] rounded py-3 border-2">

<CardComments cardId={card.id} />

</div>

</div>

))

)}

</div>
          
          

          <div className=" flex justify-between items-center cursor-pointer"
          >
             {/* Create Card Button */}
              <FaPlus onClick={() => {
          setEditingCard(null); // for new card
          setShowCardModal(true);
        }} className="text-[var(--button)]   text-2xl cursor-pointer"   />
      <button
        onClick={() => {
          setEditingCard(null); // for new card
          setShowCardModal(true);
        }}
        className="mt-2 text-[var(--button)]  text-lg font-bold px-2 py-1 rounded w-full"
      >
        Add Card
      </button>
          </div>
        </div>

      )}

 
      {showCardModal && (
        <CardComponent
          columnId={column.id}
          addCard={addCard}
            editCard={editCard}
    
          deleteCard={deleteCard}
          onClose={() => setShowCardModal(false)}
          existingCard={editingCard || undefined}
        />
      )}
      
      

     
      
    </div>
  );

}

export default React.memo(ColumnComponent);
