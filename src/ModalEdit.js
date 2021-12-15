import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react/cjs/react.development";
import style from "./static/styles";
import React from "react";

const ModalEdit = (props) => {
  const original = props.todo;
  const [todo, setTodo] = useState(props.todo);
  const handleChange = ({ target }) => {
    const value = target.value;
    setTodo((prev) => ({ ...prev, [target.name]: value }));
  };
  const handlePriorityChange = ({ target }) => {
    const value = priority.indexOf(target.value) + 1;
    setTodo((prev) => ({ ...prev, ColumnId: value }));
  };

  const priority = ["To do", "In progress", "Testing", "Done"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      TodoId: todo.TodoId,
      TodoTitle: todo.TodoTitle,
      DueDate: todo.DueDate,
      TodoDescription: todo.TodoDescription,
      Index: todo.Index,
      ColumnId: todo.ColumnId,
    };
    props.onChange(updatedTodo);
    props.onHide();
  };
  const handleHide = () => {
    setTodo((prev) => ({
      ...prev,
      TodoTitle: original.TodoTitle,
      DueDate: original.DueDate,
      TodoDescription: original.TodoDescription,
      Index: original.Index,
      ColumnId: original.ColumnId,
    }));
    props.onHide();
  };

  return (
    <>
      <Modal show={props.show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form.Label htmlFor="title">Title:</Form.Label>
            <Form.Control
              id="title"
              name="TodoTitle"
              type="text"
              value={todo.TodoTitle}
              onChange={handleChange}
            />
            <Form.Label htmlFor="description">Descripion:</Form.Label>
            <Form.Control
              id="description"
              name="TodoDescription"
              type="text"
              value={todo.TodoDescription}
              onChange={handleChange}
            />
            <Form.Label htmlFor="due-date">
              Due date:
              <Form.Control
                id="due-date"
                name="DueDate"
                type="date"
                value={todo.DueDate}
                onChange={handleChange}
                required={true}
              />
            </Form.Label>
            <Form.Label htmlFor="priority">
              Priority:
              <Form.Select
                id="priority"
                name="ColumnId"
                value={priority[todo.ColumnId - 1]}
                onChange={handlePriorityChange}
              >
                <option>To do</option>
                <option>In progress</option>
                <option>Testing</option>
                <option>Done</option>
              </Form.Select>
            </Form.Label>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={style.buttonAdd}
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
