import { useState } from "react/cjs/react.development";
import Column from "./Column";
import CardGroup from "react-bootstrap/CardGroup";
import style from "./static/styles";

const KanbanBoard = (props) => {
  const [colunms] = useState(props.data);

  return (
    <>
      <div style={style.centered}>
        <h1>Kanban Board</h1>
      </div>
      <CardGroup>
        {colunms.map((column) => (
          <Column key={column.id} column={column} todos={column.todos} />
        ))}
      </CardGroup>
    </>
  );
};

export default KanbanBoard;
