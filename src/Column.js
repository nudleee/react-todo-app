import { useEffect, useState } from "react/cjs/react.development";
import { Card, Button } from "react-bootstrap";
import React from "react";
import style from "./static/styles";
import API from "./API";
import Todo from "./Todo";
import ModalInput from "./ModalAdd";
import { GrFormAdd } from "react-icons/gr";

const Column = (props) => {
  const [todos, setTodos] = useState(props.todos);
  const [columnId] = useState(props.column.ColumnId);
  const handleSubmit = (newTodo) => {
    const size = todos == null ? 0 : todos.length;
    API.post("todos", {
      TodoTitle: newTodo.TodoTitle,
      TodoDescription: newTodo.TodoDescription,
      DueDate: newTodo.DueDate,
      Index: size + 1,
      ColumnId: props.column.ColumnId,
    })
      .then((response) => {
        const nTodo = response.data;
        const newTodos = todos?.length > 0 ? [...todos, nTodo] : [nTodo];
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setShow(false);
      });
  };
  const handleRemove = (targetID) => {
    API.delete(`todos/${targetID}`)
      .then((response) => {
        const dTodo = response.data;
        const newTodos = todos.filter((todo) => todo.TodoId !== dTodo.TodoId);
        setIndexes(newTodos, dTodo.Index);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const handleIndexChange = (clickedTodo, diff) => {
    const index = clickedTodo.Index;
    const newIndex = clickedTodo.Index + diff;
    clickedTodo.Index = newIndex;
    API.put("todos", clickedTodo)
      .then(() => {
        let todo = todos.find(
          (todo) =>
            todo.Index === clickedTodo.Index &&
            todo.TodoId !== clickedTodo.TodoId
        );
        todo.Index = index;
        API.put("todos", todo)
          .then(() => {
            props.onChange();
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const handleChange = (updatedTodo) => {
    if (updatedTodo.ColumnId !== props.column.ColumnId) {
      handleTodoMovedToAnotherColumn(updatedTodo);
    } else {
      API.put("todos", updatedTodo)
        .then(() => {
          props.onChange();
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  };
  const handleTodoMovedToAnotherColumn = (updatedTodo) => {
    const index = updatedTodo.Index;
    let column = {};
    props.columns.forEach((col) => {
      if (col.ColumnId === updatedTodo.ColumnId) {
        column = col;
      }
    });
    const size = column.Todos === null ? 0 : column.Todos.length;
    updatedTodo.Index = size + 1;

    API.put("todos", updatedTodo)
      .then(() => {
        const newTodos = todos?.filter(
          (todo) => todo.TodoId !== updatedTodo.TodoId
        );
        setIndexes(newTodos, index);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const setIndexes = (newTodos, index) => {
    let _responses = [];
    newTodos?.forEach((todo) => {
      if (todo.Index > index) {
        todo.Index--;
        API.put("todos", todo).then((res) => {
          _responses.push(res.data);
        });
      } else _responses.push(todo);
    });
    setTodos(_responses);
    props.onChange();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    API.get(`columns/${columnId}`)
      .then((response) => {
        const _todos = response.data.Todos;
        _todos?.sort(function (a, b) {
          return a.Index - b.Index;
        });
        setTodos(_todos);
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
              size={todos?.length}
              onRemove={handleRemove}
              onChange={handleChange}
              onIndexChange={handleIndexChange}
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
