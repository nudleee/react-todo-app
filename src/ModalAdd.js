import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react/cjs/react.development";

const ModalAdd = (props) => {
  const [newTodo, setNewTodo] = useState({
    id: null,
    title: "",
    description: "",
    priority: null,
  });
  const handleTitleChange = ({ target }) => {
    setNewTodo((prev) => ({ ...prev, title: target.value }));
  };
  const handleDescriptionChange = ({ target }) => {
    setNewTodo((prev) => ({ ...prev, description: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo.title) {
      props.onHide();
      return;
    }
    props.addTodo(newTodo);
    setNewTodo({ title: "", description: "" });
  };

  const todoTitle = "Enter a todo name";
  const todoDescription = "Enter the description";
  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={newTodo.title}
              placeholder={todoTitle}
              onChange={handleTitleChange}
            />
            <Form.Label>Description:</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={newTodo.description}
              placeholder={todoDescription}
              onChange={handleDescriptionChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
