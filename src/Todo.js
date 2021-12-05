import { useState } from "react/cjs/react.development";
import { Card, Button } from "react-bootstrap";
import { RiDeleteBin6Fill, RiEditFill } from "react-icons/ri";
import ModalEdit from "./ModalEdit";
import { BsFillPinAngleFill } from "react-icons/bs";
import style from "./static/styles";

const Todo = (props) => {
  const [todo, setTodo] = useState(props.todo);

  const handleChange = (updatedTodo) => {
    setTodo(updatedTodo);
    props.onChange(updatedTodo);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card border="dark" style={style.todoCard}>
        <div style={style.pin}>
          <BsFillPinAngleFill size="40px" />
        </div>
        <Card.Body>
          <Card.Title>{todo.TodoTitle} </Card.Title>
          <Card.Text>{todo.TodoDescription}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <span>{todo.DueDate}</span>
          <Button
            style={style.deleteButton}
            className="float-end"
            variant="light"
            onClick={() => props.onRemove(todo.TodoId)}
          >
            <RiDeleteBin6Fill />
          </Button>
          <Button
            style={style.editButton}
            className="float-end"
            variant="light"
            onClick={handleShow}
          >
            <RiEditFill />
          </Button>
        </Card.Footer>
      </Card>

      <ModalEdit
        type={"Edit"}
        show={show}
        onHide={handleClose}
        todo={todo}
        onChange={handleChange}
      ></ModalEdit>
    </>
  );
};

export default Todo;
