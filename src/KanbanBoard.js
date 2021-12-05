import { useState, useEffect } from "react/cjs/react.development";
import Column from "./Column";
import CardGroup from "react-bootstrap/CardGroup";
import style from "./static/styles";
import API from "./API";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    API.get("columns")
      .then((response) => {
        setColumns(response.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <>
      <div style={style.centered}>
        <h1>Kanban Board</h1>
      </div>
      <CardGroup>
        {columns.map((column) => (
          <Column key={column.ColumnId} column={column} />
        ))}
      </CardGroup>
    </>
  );
};

export default KanbanBoard;
