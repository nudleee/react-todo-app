import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react/cjs/react.development";
import React from "react";
import style from "./static/styles";

const ModalAdd = (props) => {
  const [newTodo, setNewTodo] = useState({
    TodoTitle: "",
    TodoDescription: "",
    DueDate: null,
  });
  const handleChange = ({ target }) => {
    const value = target.value;
    setNewTodo((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo.TodoTitle || !newTodo.DueDate) {
      alert("Title and DueDate fields are required!");
      return;
    }
    props.addTodo(newTodo);
    setNewTodo({ TodoTitle: "", TodoDescription: "" });
  };

  const titlePlaceholder = "Enter a todo name";
  const descriptionPlaceholder = "Enter the description";
  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton onHide={props.onHide}>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label htmlFor="title">Title:</Form.Label>
            <Form.Control
              id="title"
              name="TodoTitle"
              type="text"
              value={newTodo.TodoTitle}
              placeholder={titlePlaceholder}
              onChange={handleChange}
            />
            <Form.Label htmlFor="description">Description:</Form.Label>
            <Form.Control
              id="description"
              name="TodoDescription"
              type="text"
              value={newTodo.TodoDescription}
              placeholder={descriptionPlaceholder}
              onChange={handleChange}
            />
            <Form.Label htmlFor="due-date">Due date:</Form.Label>
            <Form.Control
              id="due-date"
              name="DueDate"
              type="date"
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={style.buttonAdd}
            type="submit"
            onClick={handleSubmit}
          >
            Add todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
