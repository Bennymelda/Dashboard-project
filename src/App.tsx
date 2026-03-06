import { AppProvider } from "./context/AppProvider";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";


// Lazy load Board page
const Board = lazy(() => import("./pages/Board"));

function App() {
  return (
    
      <AppProvider>
        
        <div className="pt-16"> {/* padding top for fixed navbar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/board/:boardId"
              element={
                <Suspense fallback={<div className="p-4">Loading Board...</div>}>
                  <Board />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </AppProvider>
  
  );
}

export default App;