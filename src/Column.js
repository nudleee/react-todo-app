import { useEffect, useState } from "react/cjs/react.development";
import { Card, Button } from "react-bootstrap";
import style from "./static/styles";
import API from "./API";
import Todo from "./Todo";
import ModalInput from "./ModalAdd";
import { GrFormAdd } from "react-icons/gr";

const Column = (props) => {
  const [todos, setTodos] = useState(props.todos);
  const [columnId] = useState(props.column.ColumnId);
  const handleSubmit = (newTodo) => {
    API.post("todos", {
      TodoTitle: newTodo.TodoTitle,
      TodoDescription: newTodo.TodoDescription,
      DueDate: newTodo.DueDate,
      ColumnId: props.column.ColumnId,
    })
      .then((response) => {
        const todo = response.data;
        const newTodos = todos?.length > 0 ? [...todos, todo] : [todo];
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShow(false);
      });
  };
  const handleRemove = (targetID) => {
    API.delete(`todos/${targetID}`)
      .then(() => {
        const newTodos = todos.filter((todo) => todo.TodoId !== targetID);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const handleChange = (updatedTodo) => {
    API.put("todos", updatedTodo)
      .then(() => {
        if (updatedTodo.ColumnId !== props.column.ColumnId) {
          const newTodos = todos.filter(
            (todo) => todo.TodoId !== updatedTodo.TodoId
          );
          setTodos(newTodos);
          props.onChange();
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    API.get(`columns/${columnId}`)
      .then((response) => {
        setTodos(response.data.Todos);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [props.todos, columnId]);

  return (
    <>
      <Card style={style.card}>
        <Card.Body>
          <Card.Title style={style.cardTitle}>
            <h4>{props.column.ColumnTitle}</h4>
          </Card.Title>
          {todos?.map((todo) => (
            <Todo
              key={todo.TodoId}
              todo={todo}
              onRemove={handleRemove}
              onChange={handleChange}
            />
          ))}
          <ModalInput
            type={"Add"}
            show={show}
            onHide={handleClose}
            addTodo={handleSubmit}
          ></ModalInput>

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
    </>
  );
};

export default Column;
