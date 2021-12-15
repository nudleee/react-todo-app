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
        props.onChange();
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

        if (newTodos.length != 0) setIndexes(newTodos, dTodo.Index);

        setTodos(newTodos);
        refresh();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const handleIndexChange = (clickedTodo, diff) => {
    const index = clickedTodo.Index;
    const newIndex = clickedTodo.Index + diff;
    clickedTodo.Index = newIndex;

    let changedTodo = todos.find((todo) => todo.Index == newIndex);
    changedTodo.Index = index;

    let updatedTodos = [clickedTodo, changedTodo];

    API.put("columns/todos", updatedTodos)
      .then((response) => {
        setTodos(response.data);
        refresh();
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
        .then((response) => {
          let updated = response.data;
          const newTodos = todos.filter(
            (todo) => todo.TodoId !== updated.TodoId
          );
          newTodos.push(updated);
          setTodos(newTodos);
          refresh();
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
        if (newTodos.length != 0) setIndexes(newTodos, index);
        props.onChange();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const setIndexes = (updatedTodos, index) => {
    updatedTodos.forEach((todo) => {
      if (todo.Index > index) {
        todo.Index--;
      }
    });
    API.put("columns/todos", updatedTodos)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refresh = () => {
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
  };

  useEffect(() => {
    refresh();
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
              key={
                todo.TodoId + todo.Index + todo.TodoTitle + Todo.TodoDescription
              }
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
