import { AppProvider } from "./context/AppProvider";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrrorBoundary";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";





// Lazy load Board page
const Board = lazy(() => import("./pages/Board"));

function App() {
  return (
    
      <AppProvider>
        
        <div className="pt-16"> {/* padding top for fixed navbar */}
          <Routes>
            <Route path="/" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
            <Route
              path="/board/:boardId"
              element={
                <Suspense fallback={<div className="p-4">Loading Board...</div>}>
                  <ErrorBoundary>
                    <Board />
                  </ErrorBoundary>
                  
                </Suspense>
              }
            />
          </Routes>
          
<ToastContainer

position="top-right"

autoClose={3000} // closes after 3 seconds

hideProgressBar={false}

newestOnTop={false}

closeOnClick

rtl={false}

pauseOnFocusLoss

draggable

pauseOnHover

/>


        </div>
      </AppProvider>
  
  );
}

export default App;