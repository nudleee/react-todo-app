import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react/cjs/react.development";

const ModalEdit = (props) => {
  const original = props.todo;
  const [todo, setTodo] = useState(props.todo);
  const handleTitleChange = ({ target }) => {
    setTodo((prev) => ({ ...prev, title: target.value }));
  };
  const handleDescriptionChange = ({ target }) => {
    setTodo((prev) => ({ ...prev, description: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setTodo((prev) => ({
      ...prev,
      title: todo.title,
      description: todo.description,
    }));
    props.onHide();
  };

  const handleHide = () => {
    setTodo((prev) => ({
      ...prev,
      title: original.title,
      description: original.description,
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
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={todo.title}
              onChange={handleTitleChange}
            />
            <Form.Label>Descripion:</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={todo.description}
              onChange={handleDescriptionChange}
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
