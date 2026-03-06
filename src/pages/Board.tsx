import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useCallback, memo, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import type { ColumnType, CardType } from "../types";
import ColumnComponent from "../components/column";
import CardComponent from "../components/card"; // import your modal
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeft, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

function Board(){
  const { boardId } = useParams<{ boardId: string }>(); // get boardId from URL
  const navigate = useNavigate();

  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  
  const [showCardModal, setShowCardModal] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const context = useContext(AppContext)!; // assume provider is present
  const {
    boards,
    columns,
    cards,
    addColumn,
    editColumn,
    deleteColumn,
    addCard,
    editCard,
    deleteCard,
    deleteBoard,
  } = context;

  const board = boards.find((b) => b.id === boardId);

  // Add Column
  const handleAddColumn = useCallback(() => {
    if (!newColumnTitle.trim() || !board) return;

    const column: ColumnType = {
      id: uuidv4(),
      title: newColumnTitle,
      cardIds: [],
    };

    addColumn(board.id, column);
    setNewColumnTitle("");
    setShowColumnModal(false);
  }, [newColumnTitle, addColumn, board]);

  const handleDeleteColumn = useCallback(
    (columnId: string) => {
      if (!board) return;
      deleteColumn(board.id, columnId);
    },
    [deleteColumn, board]
  );
const handleCreateCard = useCallback((columnId: string) => {
  setActiveColumnId(columnId);
  setShowCardModal(true);
}, []);
  const handleDeleteBoard = useCallback(() => {
    if (!board) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the board "${board.title}"?`
    );
    if (!confirmDelete) return;

    deleteBoard(board.id); // delete from state
    navigate("/");          // navigate back to dashboard
  }, [board, deleteBoard, navigate]);
const closeBoard = () => navigate("/");


  // Memoize mapping of columnId -> cards
  const columnsWithCards: Record<string, CardType[]> = useMemo(() => {
    if (!board) return {};
    const map: Record<string, CardType[]> = {};
    board.columnIds.forEach((colId) => {
      const column = columns[colId];
      if (!column) return;
      map[colId] = column.cardIds
        .map((id) => cards[id])
        .filter((c): c is CardType => !!c); // TypeScript type guard
    });
    return map;
  }, [board, columns, cards]);

  if (!board) return <div>Board not found</div>;
  return (
    <div >
      <header className="fixed top-0 left-0 w-full bg-white py-5 px-4 border-b-2 border-gray-100 flex justify-between items-center mb-4 z-50">
        
          <FaArrowLeft  onClick={closeBoard} className="text-gray-500 text-xl"/>
 <h2 className="text-xl font-bold text-zinc-900 whitespace-nowrap">{board.title}</h2>
         <div className="flex gap-2 items-center">
          <FaTrash onClick={handleDeleteBoard} className=" hidden md:block text-red-500 cursor-pointer" />
          <p
            onClick={handleDeleteBoard}
            className="text-red-500 whitespace-nowrap font-bold cursor-pointer"
          >
            Delete Board
          </p>
          
          </div> 
          
        
       
       
        
      </header>
      <div className=" border-dashed flex py-2 items-center mx-10 mt-10  bg-white border-3 rounded-xl justify-center border-gray-400 ">
        <FaPlus className="text-2xl text-gray-500 cursor-pointer " onClick={() => setShowColumnModal(true)}/>
        <button
          onClick={() => setShowColumnModal(true)}
          className=" text-zinc-600 font-bold text-lg px-4 py-2 rounded cursor-pointer" 
        >
          Add Column
        </button>
      </div>
      

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">
        {board.columnIds.map((colId) => {
  const column = columns[colId];
  if (!column) return null;

 const columnCards = columnsWithCards[colId]; // memoized
          return (
            <ColumnComponent
              key={column.id}
              column={column}
             cards={columnCards}

              onDeleteColumn={handleDeleteColumn}
              editColumn={editColumn}
              addCard={addCard}
              deleteCard ={deleteCard}
              editCard={editCard}
              onCreateCard={handleCreateCard}
            />
          );
        })}
      </div>

      {/* Column Modal */}
      {showColumnModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowColumnModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="flex justify-between items-center mb-10">
                          <h2 className="text-2xl font-bold ">New Column</h2>
                          <FaTimes onClick={() => setShowColumnModal(false)}className="text-2xl text-gray-400 cursor-pointer"/>
                        </div>
          
            <input
              aria-label="Column title"
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Column Title"
              className="p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded-xl outline-none focus:ring-1 text-lg focus:ring-purple-700 border-gray-300 focus:border-purple-700 px-4 py-3"
            />
            <div className="flex justify-start">
              <button
                onClick={handleAddColumn}
                className="bg-purple-700 px-6 rounded cursor-pointer font-bold text-white py-2 "
              >
              Add column
              </button>

              
            </div>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {showCardModal && activeColumnId && (
        <CardComponent
          columnId={activeColumnId}
          addCard={addCard}
          editCard={editCard}
          deleteCard={deleteCard}
          onClose={() => {
            setShowCardModal(false);
            setActiveColumnId(null);
            
          }}
        />
      )}
    </div>
  );
}

export default memo(Board);