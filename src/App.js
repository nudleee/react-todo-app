import { useState } from "react";
import KanbanBoard from "./KanbanBoard";
import columnTitels from "./static/columnTitels";

function App() {
  const [data] = useState(columnTitels);

  return (
    <>
      <KanbanBoard data={data} />
    </>
  );
}

export default App;
