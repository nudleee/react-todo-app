import { useState } from "react/cjs/react.development";
import { Card, Button } from "react-bootstrap";
import { RiDeleteBin6Fill, RiEditFill } from "react-icons/ri";
import EditModal from "./ModalEdit";
import { BsFillPinAngleFill } from "react-icons/bs";
import style from "./static/styles";

const Todo = (props) => {
  const [todo, setTodo] = useState(props.todo);

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
          <Card.Title>{todo.title} </Card.Title>
          <Card.Text>{todo.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            style={style.deleteButton}
            className="float-end"
            variant="light"
            onClick={() => props.onRemove(todo.id)}
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
      <EditModal
        show={show}
        onHide={handleClose}
        todo={todo}
        setTodo={setTodo}
      ></EditModal>
    </>
  );
};

export default Todo;
