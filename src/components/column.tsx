import React, { useState, useCallback } from "react";
import type { ColumnType,CardType } from "../types";
import CardComponent from "./card";
import ReactMarkdown from "react-markdown";
import { FaPlus,FaTrash } from "react-icons/fa";
import { MdEdit} from "react-icons/md";
interface Props {
  column: ColumnType;
    cards: CardType[]; // pass cards as a prop
  onDeleteColumn: (columnId: string) => void;
  editColumn: (columnId: string, title: string) => void;
  onCreateCard: (columnId: string) => void; // callback to open card modal or navigate
 addCard: (columnId: string, card: CardType) => void;
 editCard: (cardId: string, updatedCard: Partial<CardType>) => void;
  deleteCard: (columnId: string, cardId: string) => void;
}

function ColumnComponent({ column, onDeleteColumn, editColumn, cards, addCard,editCard, deleteCard}: Props) {
  const [editingColumn, setEditingColumn] = useState(false);
  const [localColumnTitle, setLocalColumnTitle] = useState(column.title);
    const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const handleSaveColumn = useCallback(() => {
    editColumn(column.id, localColumnTitle);
    setEditingColumn(false);
  }, [column.id, localColumnTitle, editColumn]);
console.log("Rendering Column:", column.id);

  return (
    <div className="p-4 rounded-2xl border-2 border-gray-300 flex flex-col  bg-gray-50 mb-10 w-120 
     mx-auto  mt-10">
      {/* Column Title Edit */}
      {editingColumn ? (
        <div className="flex flex-col gap-1 mb-2">
          <input
            value={localColumnTitle}
            onChange={(e) => setLocalColumnTitle(e.target.value)}
            className="outline-none focus:ring-1 text-lg focus:ring-purple-700  focus:border-purple-700 p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl border-gray-300 px-4 py-3"
          />
          <div className="flex gap-1">
            <button
              onClick={handleSaveColumn}
              className="bg-purple-500 font-bold text-lg text-white px-2 py-1 rounded flex-1"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingColumn(false);
                setLocalColumnTitle(column.title);
              }}
              className="bg-gray-300 font-bold text-lg px-2 py-1 rounded flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-between h-full  items-center mb-2">
          
          <div>
            <div className="flex   justify-between gap-90 mb-10 items-center  w-full ">
              <h3 className="font-bold text-2xl text-zinc-800 ">{column.title}</h3>
            <div className="flex gap-1 items-center ">
          
            <MdEdit onClick={() => setEditingColumn(true)}className="text-gray-500 cursor-pointer text-lg" />
            <FaTrash onClick={() => onDeleteColumn(column.id)} className="text-red-500 cursor-pointer text-lg" />
          </div>

            </div>
            <div className="flex flex-col gap-4 mb-2 ">
        {(cards || []).map((card) => {
  console.count(`Card Render: ${card.id}`);

  return (
    <div key={card.id} className="border pb-8 rounded p-2 bg-white border-gray-200">
      <h4 className="font-bold text-lg mb-4">{card.title}</h4>

      <div className="card break-all text-md text-gray-800 p-2 mb-2">
        <ReactMarkdown>{card.description || "Nothing yet..."}</ReactMarkdown>
      </div>

      {card.tags.length > 0 && (
        <p className="text-normal text-gray-700 mb-2">
          <strong className="text-zinc-800">Tags:</strong> {card.tags.join(", ")}
        </p>
      )}

      {card.dueDate && (
        <p className="text-md text-gray-500">
          {new Date(card.dueDate).toDateString()}
        </p>
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
    </div>
  );
})}

      </div>
          </div>
          
          <div className=" flex justify-between items-center cursor-pointer"
          >
             {/* Create Card Button */}
              <FaPlus onClick={() => {
          setEditingCard(null); // for new card
          setShowCardModal(true);
        }} className="text-purple-700  text-2xl cursor-pointer"   />
      <p
        onClick={() => {
          setEditingCard(null); // for new card
          setShowCardModal(true);
        }}
        className="mt- text-purple-700 text-lg font-bold px-2 py-1 rounded w-full"
      >
        Add Card
      </p>
          </div>
        </div>

      )}
 {/* Card Modal */}
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
