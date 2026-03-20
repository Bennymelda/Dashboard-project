import {  useNavigate,useLocation } from "react-router-dom";
import { useContext, useState, useCallback, memo } from "react";
import { AppContext } from "../context/AppContext";
import { useRef, useEffect } from "react";
import type { BoardType } from "../types";
import Button from "../components/buttton";
import { FaTrash, FaPlus} from "react-icons/fa";
import { toast } from "react-toastify";
import { DarkModeToggle } from "../components/theme";
import Input from "../components/input";
import BoardSkeleton from "../components/BoardSkeleton";
import Textarea from "../components/Textarea";
import Modal from "../components/modal";
// Success example




const BoardItem = memo(function BoardItem({
  board,
  onDelete,
}: {
  board: BoardType;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <article className="border pb-15 rounded-lg h-64 p-4 shadow-sm border-[var(--two)] bg-[var(--two)]">
      <div className="flex justify-between">
       <h3 className="font-bold  text-2xl mb-4 md:4xl text-[var(--text)]">{board.title}</h3>
       
     <button
  aria-label="Delete board"
  onClick={(e) => {
    e.stopPropagation();
    onDelete(board.id);
  }}
  className="  px-2 py-1 rounded mt-2"
>
  
  <FaTrash className="text-gray-500 cursor-pointer md:text-xl" />
</button>
      </div>
      <hr className="opacity-20  mb-4 " />
      <p className=" text-lg mb-4 md:text-xl text-[var(--text)]">{board.description}</p>
      <p className="text-md text-[var(--text)] font-semibold md:text-lg">
        {board.createdAt.toDateString()}
      </p>

    </article>
  );
});

function Dashboard() {
   const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const createBoardFromNav = query.get("create") === "true";
  const [showModal, setShowModal] = useState(createBoardFromNav);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const context = useContext(AppContext)!; // assume provider exists
  const { boards, addBoard, deleteBoard, isLoading} = context;

{/* ...inside Dashboard component */}

// Add refs for first and last focusable elements
const firstInputRef = useRef<HTMLInputElement>(null);
const modalRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
    setShowModal(createBoardFromNav);
  }, [createBoardFromNav]);

useEffect(() => {
  if (showModal && firstInputRef.current) {
    firstInputRef.current.focus(); // auto-focus first input
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showModal) return;

    if (e.key === "Escape") {
      setShowModal(false);
    }

    if (e.key === "Tab" && modalRef.current) {
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        "input, textarea, button"
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [showModal]);

  // Memoized create board
  const handleCreateBoard = useCallback(() => {
    if (!title.trim()) return;

    addBoard({
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date(),
      columnIds: [],
    });

    setTitle("");
    setDescription("");
    setShowModal(false);
    
toast.success("Board created successfully!");




  }, [title, description, addBoard]);

  // Memoized delete
  const handleDeleteBoard = useCallback(
    (id: string) => {
      deleteBoard(id);
      // Error example
toast.success("Board deleted successfully!");

    },
    [deleteBoard]
    
  );
const handleOpenBoard = useCallback((id: string) => {
    navigate(`/Board/${id}`);
  }, [navigate]);
    const [errors, setErrors] = useState({

title: "",

description: "",

});



const validateBoardForm = () => {

const newErrors = {

title: title.trim() ? "" : "No board title yet",

description: description.trim() ? "" : "No board description yet",

};



setErrors(newErrors);



return !newErrors.title && !newErrors.description;

};



const handleSubmitBoard = () => {

if (!validateBoardForm()) return;

handleCreateBoard();

};
  return (
    
    <main className="p-6 mb-20 ">
      <div className="flex  justify-between items-center  fixed top-0 left-0 w-full bg-[var(--bg-color)] shadow-md py-5  px-2 z-50 mb-20">
            <DarkModeToggle />
            <h1 className="text-xl font-bold text-[var(--text)]">
              Workflow Dashboard
            </h1>
            
            <Button
         onClick={() => setShowModal(true)}
        variant="primary" size="sm"
      >
        Create Board
      </Button>
     
      
          </div>
      {/* Board List */}
    {/*
<section className="mt-10 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-4">
  {isLoading ? (
    <>
    <BoardSkeleton />
    <BoardSkeleton />
    <BoardSkeleton />
    </>
  ):
  <>
{boards.length === 0 ?(
  

<div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-[var(--board)] rounded-lg mt-10">

<p className="text-[var(--button)] text-xl font-bold mb-2">No boards yet!</p>

<p className="text-[var(--list)]  mb-4">Click the button below to create your first board.</p>

<Button

onClick={() => setShowModal(true)}

variant="primary"
size="md"

>

Create Board

</Button>

</div>
):(
  
boards.map((board) => (

<div

key={board.id}

onClick={() => handleOpenBoard(board.id)}

className="cursor-pointer bg"

>

<BoardItem board={board} onDelete={handleDeleteBoard} onOpen={handleOpenBoard} />

</div>

))}
</>
)}


</section>
  */}

  <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">

{isLoading ? (

<>

<BoardSkeleton />

<BoardSkeleton />



</>

) : (

<>

{boards.length === 0 ? (

<div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-[var(--board)] rounded-lg mt-10">

<p className="text-[var(--button)] text-xl font-bold mb-2">

No boards yet!

</p>

<p className="text-[var(--list)] mb-4">

Click the button below to create your first board.

</p>

<Button

onClick={() => setShowModal(true)}

variant="primary"

size="md"

>

Create Board

</Button>

</div>

) : (

boards.map((board) => (

<div

key={board.id}

onClick={() => handleOpenBoard(board.id)}

className="cursor-pointer bg"

>

<BoardItem

board={board}

onDelete={handleDeleteBoard}

onOpen={handleOpenBoard}

/>

</div>

))

)}

</>

)}

</section>

    {/*
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center "
          role="dialog"
          aria-modal="true"
           onClick={() => setShowModal(false)}
        >
          <div className="bg-[var(--modal)]  p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()} ref={modalRef} >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--text)]">Create New Board</h2>
              <FaTimes onClick={() => setShowModal(false)} className="text-2xl text-gray-400 cursor-pointer"/>
            </div>
            
            <label htmlFor="" className="font-bold text-lg text-[var(--text)]">Board Title</label>
            <Input
              aria-label="Board title"
              type="text"
              placeholder="Board Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="primary"
                inputSize="sm"
              ref={firstInputRef} // set ref for auto-focus
            />
            <div className="mt-5 mb-10">
              <label htmlFor="" className="font-bold text-lg text-[var(--text)]">Description </label>
            <Textarea
              aria-label="Board description"
              placeholder="Board Description"
              value={description}
              variant="primary"
              textareaSize="sm"
              onChange={(e) => setDescription(e.target.value)}
             
            />
            </div>
            

            <div className="flex justify-end md:px-10">
              <Button
                onClick={handleCreateBoard}
                variant="primary"
                size="lg"
              >
              Create Board
              </Button>

              
            </div>
          </div>
        </div>
      )}
      <div  onClick={() => setShowModal(true)} className="mt-20  flex justify-center flex-col items-center gap-4 text-center border-3 border-dashed border-[var(--board)] rounded p-15 ">
        <div className="text-center w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
          <FaPlus className="text-[var(--board)]  text-2xl cursor-pointer"  onClick={() => setShowModal(true)} />
        </div>
        <Button
          onClick={() => setShowModal(true)}
          variant="primary"
        
        >
          Create New Board
        </Button>
        
      </div>
      */}
   


{/*
{showModal && (

<div

className="fixed inset-0 bg-black/40 flex items-center justify-center"

role="dialog"

aria-modal="true"

onClick={() => setShowModal(false)}

>

<div

className="bg-[var(--modal)] p-6 rounded-lg w-96"

onClick={(e) => e.stopPropagation()}

ref={modalRef}

>

<div className="flex justify-between items-center mb-10">

<h2 className="text-2xl font-bold text-[var(--text)]">Create New Board</h2>

<FaTimes

onClick={() => setShowModal(false)}

className="text-2xl text-gray-400 cursor-pointer"

/>

</div>



<label className="font-bold text-lg text-[var(--text)]">Board Title</label>

<Input

aria-label="Board title"

type="text"

placeholder="Board Title"

value={title}

onChange={(e) => {

setTitle(e.target.value);

if (errors.title) {

setErrors((prev) => ({ ...prev, title: "" }));

}

}}

variant="primary"

inputSize="sm"

ref={firstInputRef}

/>

{errors.title && (

<p className="text-sm text-[var(--errors)] mt-1 mb-3">{errors.title}</p>

)}



<div className="mt-5 mb-10">

<label className="font-bold text-lg text-[var(--text)]">Description</label>

<Textarea

aria-label="Board description"

placeholder="Board Description"

value={description}

variant="inner"

textareaSize="sm"

onChange={(e) => {

setDescription(e.target.value);

if (errors.description) {

setErrors((prev) => ({ ...prev, description: "" }));

}

}}

/>

{errors.description && (

<p className="text-sm text-[var(--errors)] mt-1">{errors.description}</p>

)}

</div>



<div className="flex justify-end md:px-10">

<Button onClick={handleSubmitBoard} variant="primary" size="lg">

Create Board

</Button>

</div>

</div>

</div>

)}
*/}
<Modal

isOpen={showModal}

onClose={() => setShowModal(false)}

size="md"

title="Create New Board"

>

<label className="font-bold text-lg text-[var(--text)]">Board Title</label>

<Input

aria-label="Board title"

type="text"

placeholder="Board Title"

value={title}

onChange={(e) => {

setTitle(e.target.value);

if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));

}}

variant="primary"

inputSize="sm"

ref={firstInputRef}

/>

{errors.title && (

<p className="text-sm text-[var(--errors)] mt-1 mb-3">{errors.title}</p>

)}



<div className="mt-5 mb-10">

<label className="font-bold text-lg text-[var(--text)]">Description</label>

<Textarea

aria-label="Board description"

placeholder="Board Description"

value={description}

variant="inner"

textareaSize="sm"

onChange={(e) => {

setDescription(e.target.value);

if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));

}}

/>

{errors.description && (

<p className="text-sm text-[var(--errors)] mt-1">{errors.description}</p>

)}

</div>



<div className="flex justify-end md:px-10">

<Button onClick={handleSubmitBoard} variant="primary" size="lg">

Create Board

</Button>

</div>

</Modal>

<div

onClick={() => setShowModal(true)}

className="mt-20 flex justify-center flex-col items-center gap-4 text-center border-3 border-dashed border-[var(--board)] rounded p-15"

>

<div className="text-center w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">

<FaPlus

className="text-[var(--board)] text-2xl cursor-pointer"

onClick={() => setShowModal(true)}

/>

</div>



<Button onClick={() => setShowModal(true)} variant="primary">

Create New Board

</Button>

</div>
    </main>
  );
}

export default memo(Dashboard);