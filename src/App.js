import KanbanBoard from "./KanbanBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
