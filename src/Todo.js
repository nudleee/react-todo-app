import { useState } from "react/cjs/react.development";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { RiDeleteBin6Fill, RiEditFill } from "react-icons/ri";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import ModalEdit from "./ModalEdit";
import { BsFillPinAngleFill } from "react-icons/bs";
import style from "./static/styles";

const Todo = (props) => {
  const [todo, setTodo] = useState(props.todo);

  const handleChange = (updatedTodo) => {
    props.onChange(updatedTodo);
    setTodo(updatedTodo);
  };

  const handleArrowUp = () => {
    if (todo.Index !== 1) {
      props.onIndexChange(todo, -1);
    }
  };
  const handleArrowDown = () => {
    if (todo.Index < props.size && props.size !== 1) {
      props.onIndexChange(todo, 1);
    }
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card border="dark" style={style.todoCard}>
        <Button style={style.arrowButton} onClick={handleArrowUp}>
          <AiOutlineArrowUp />
        </Button>
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
        <Button style={style.arrowButton} onClick={handleArrowDown}>
          <AiOutlineArrowDown />
        </Button>
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
