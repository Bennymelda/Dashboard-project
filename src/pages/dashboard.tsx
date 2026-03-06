import {  useNavigate,useLocation } from "react-router-dom";
import { useContext, useState, useCallback, memo } from "react";
import { AppContext } from "../context/AppContext";
import { useRef, useEffect } from "react";
import type { BoardType } from "../types";
import { FaTrash, FaPlus, FaTimes} from "react-icons/fa";

const BoardItem = memo(function BoardItem({
  board,
  onDelete,
}: {
  board: BoardType;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <article className="border pb-15 rounded-lg h-72  p-4 shadow-sm border-gray-100 bg-white">
      <div className="flex justify-between">
       <h3 className="font-bold  text-2xl mb-4 md:4xl">{board.title}</h3>
       
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
      <p className="text-gray-900 text-lg mb-4 md:text-xl">{board.description}</p>
      <p className="text-md text-gray-800 font-semibold md:text-lg">
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
  const { boards, addBoard, deleteBoard } = context;


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
  }, [title, description, addBoard]);

  // Memoized delete
  const handleDeleteBoard = useCallback(
    (id: string) => {
      deleteBoard(id);
    },
    [deleteBoard]
  );
const handleOpenBoard = useCallback((id: string) => {
    navigate(`/Board/${id}`);
  }, [navigate]);
  return (
    <main className="p-6 mb-20 ">
      <div className="flex  justify-between items-center  fixed top-0 left-0 w-full bg-white shadow-md py-5  px-2 z-50 mb-20">
            <h1 className="text-xl font-bold text-purple-700">
              Workflow Dashboard
            </h1>
            <button
         onClick={() => setShowModal(true)}
        className="bg-purple-700  text-white px-4 py-2 rounded"
      >
        Create Board
      </button>
          </div>
      {/* Board List */}
    <section className=" mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
  {boards.map((board) => (
    <div
      key={board.id}
      onClick={() => handleOpenBoard(board.id)}
      className="cursor-pointer"
    >
      <BoardItem board={board} onDelete={handleDeleteBoard} onOpen={handleOpenBoard} />
    </div>
  ))}
</section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center "
          role="dialog"
          aria-modal="true"
           onClick={() => setShowModal(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()} ref={modalRef} >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold ">Create New Board</h2>
              <FaTimes onClick={() => setShowModal(false)} className="text-2xl text-gray-400 cursor-pointer"/>
            </div>
            
            <label htmlFor="" className="font-bold text-lg">Board Title</label>
            <input
              aria-label="Board title"
              type="text"
              placeholder="Board Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded border-gray-300 focus:border-purple-700 px-4 py-3 outline-none focus:ring-1 text-lg focus:ring-purple-700"
              ref={firstInputRef} // set ref for auto-focus
            />
            <div className="mt-5 mb-10">
              <label htmlFor="" className="font-bold text-lg">Description </label>
            <textarea
              aria-label="Board description"
              placeholder="Board Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 w-full mb-2 bg-gray-50 border-2 mt-2 rounded border-gray-300 focus:border-purple-700 px-4 py-3 outline-none focus:ring-1 text-lg focus:ring-purple-700 "
            />
            </div>
            

            <div className="flex justify-end md:px-10">
              <button
                onClick={handleCreateBoard}
                className="bg-purple-700 px-6 rounded cursor-pointer font-bold text-white py-2 "
              >
              Create Board
              </button>

              
            </div>
          </div>
        </div>
      )}
      <div  onClick={() => setShowModal(true)} className="mt-20  flex justify-center flex-col items-center gap-4 text-center border-3 border-dashed border-purple-500 rounded p-15 ">
        <div className="text-center w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
          <FaPlus className="text-purple-500  text-2xl cursor-pointer"  onClick={() => setShowModal(true)} />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-purple-700 font-semibold text-2xl cursor-pointer"
        >
          Create New Board
        </button>
        
      </div>
    </main>
  );
}

export default memo(Dashboard);