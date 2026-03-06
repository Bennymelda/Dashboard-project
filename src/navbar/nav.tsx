import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateBoardClick = () => {
    navigate("/?create=true"); // navigates to dashboard and triggers modal
  };
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const links = [
    { name: "Home", path: "/" },
   

  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 b-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-purple-700">
              Workflow Dashboard
            </h1>
          </div>
           
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 font-bold border-b-2 border-purple-700"
                    : "text-gray-700 hover:text-purple-700 font-medium"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <button
        onClick={handleCreateBoardClick}
        className="bg-purple-700  text-white px-4 py-2 rounded"
      >
        Create Board
      </button>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-700 p-2 rounded-md"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-bold text-purple-700 bg-purple-50"
                    : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }
                onClick={() => setIsOpen(false)} // close menu on click
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}