import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useCallback, memo, useMemo, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import type { ColumnType, CardType } from "../types";
import ColumnComponent from "../components/column";
import CardComponent from "../components/card"; // import your modal
import { UndoRedoControls } from "../components/undoRedoControls";
import Modal from "../components/modal";
import { FaArrowLeft, FaTrash, FaPlus} from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../components/input";
import Button from  "../components/buttton";
import BoardSkeleton from "../components/BoardSkeleton";
function Board(){
  const { boardId } = useParams<{ boardId: string }>(); // get boardId from URL
  const navigate = useNavigate();

  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  
  const [showCardModal, setShowCardModal] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);
const [sourceIndex, setSourceIndex] = useState<number | null>(null);


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
    moveCard,
    isLoading,
    setIsLoading,
    addComment,
  } = context;

  const board = boards.find((b) => b.id === boardId);
useEffect( ()=>{
  const timer=setTimeout( ()=>{
    setIsLoading(false)
  }, 800)
  return()=>clearTimeout(timer)
},[])
  // Add Column
  const handleAddColumn = useCallback(() => {
    if (!newColumnTitle.trim() || !board) return;

    const column: ColumnType = {
      id: crypto.randomUUID(),
      title: newColumnTitle,
      cardIds: [],
    };
     
  toast.success("Column created successfully!");
    addColumn(board.id, column);
    setNewColumnTitle("");
    setShowColumnModal(false);
  }, [newColumnTitle, addColumn, board]);

  const handleDeleteColumn = useCallback(
    (columnId: string) => {
      if (!board) return;
      deleteColumn(board.id, columnId);
         
      toast.success("Column deleted successfully!");
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
toast.success("Board deleted successfully!");
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
if(isLoading){
  return<BoardSkeleton />
}
  if (!board) return <div>Board not found</div>;
  return (
    <div >
      <header className="fixed top-0 left-0 w-full bg-[var(--bg-color)]   py-5 px-4 border-b-2 border-[var(--border)]  flex justify-between items-center mb-4 z-50">
        
          <FaArrowLeft  onClick={closeBoard} className="text-gray-500 text-xl"/>
 <h2 className="text-xl font-bold  whitespace-nowrap text-[var(--text)] ">{board.title}</h2>
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
        <FaPlus className="text-2xl text-[var(--button)] cursor-pointer " onClick={() => setShowColumnModal(true)}/>
        <Button
          onClick={() => setShowColumnModal(true)}
          variant="gop" 
          size="car"
        >
          Add Column
        </Button>
        
      </div>
      <div className="flex justify-center gap-4 mt-5">
        <UndoRedoControls />
      </div>

      {/* Columns */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">
        {board.columnIds &&
        board.columnIds.length > 0 ?
        (board.columnIds || []).map((colId) => {
  const column = columns[colId];
  if (!column) return null;

 const columnCards = columnsWithCards[colId] || []; // memoized
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
              moveCard={moveCard}
              isLoading={isLoading}
              draggedCardId={draggedCardId}
              setDraggedCardId={setDraggedCardId}
              sourceColumnId={sourceColumnId}
              setSourceColumnId={setSourceColumnId}
              sourceIndex={sourceIndex}
              setSourceIndex={setSourceIndex}
              addComment={addComment}
            />
          );
        }):(
         <div className="col-span-full mt-4  text-center p-10 border-2 border-dashed rounded-md text-gray-500 italic">

        No columns yet. Click “Add Column” to get started!

        </div>
        )}
      </div>



      {showColumnModal && (

<Modal

isOpen={showColumnModal}

onClose={() => setShowColumnModal(false)}

title="New Column"

size="md"

>

<Input

aria-label="Column title"

type="text"

value={newColumnTitle}

onChange={(e) => setNewColumnTitle(e.target.value)}

placeholder="Column Title"

variant="primary"

inputSize="sm"

/>

<div className="flex justify-start mt-4">

<Button

onClick={handleAddColumn}

variant="primary"

size="md"

>

Add column

</Button>

</div>

</Modal>

)}
      {/* Card Modal */}
      {showCardModal && activeColumnId && (

<Modal

isOpen={showCardModal}

onClose={() => {

setShowCardModal(false);

setActiveColumnId(null);

}}

title="Card Details" // You can make this dynamic if needed

size="md"

>

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

</Modal>

)}
    </div>
  );
}

export default memo(Board);