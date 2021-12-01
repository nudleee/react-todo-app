import { useState } from "react/cjs/react.development";
import Todo from "./Todo";
import { Button, Card } from "react-bootstrap";
import InputModal from "./ModalAdd";
import { GrFormAdd } from "react-icons/gr";
import style from "./static/styles";

const Column = (props) => {
  const [todos, setTodos] = useState([]);
  const handleSubmit = (newTodo) => {
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        column: props.column.id,
      },
    ];
    setTodos(newTodos);
    setShow(false);
  };
  const handleRemove = (targetID) => {
    const newTodos = todos.filter((todo) => todo.id !== targetID);
    setTodos(newTodos);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={style.card}>
        <Card.Body>
          <Card.Title style={style.cardTitle}>
            <h4>{`${props.column.columnTitle} (${todos.length})`}</h4>
          </Card.Title>
          <div>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} onRemove={handleRemove} />
            ))}
          </div>

          <div>
            <Button
              style={style.addTodoButton}
              className="float-end"
              onClick={handleShow}
            >
              <GrFormAdd />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <InputModal
        show={show}
        onHide={handleClose}
        input={"todo"}
        addTodo={handleSubmit}
      ></InputModal>
    </>
  );
};

export default Column;
