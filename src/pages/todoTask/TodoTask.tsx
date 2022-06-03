import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import InputField from "../../components/InputField";
import TodoList from "../../components/TodoList";
import { success, warning } from "../notification/notifycationTask";
import { TodoTaskProps } from "./interface";
import "./style.scss";
const TodoTask: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoTaskProps[]>([]);
  const [todosDone, setTodosDone] = useState<TodoTaskProps[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.length > 0) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
      success("Enter Task Success!");
    } else {
      warning("Please Enter task");
    }
  };
  const onDragEnd = (result: DropResult) => {
    console.log("result", result);
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = todosDone;
    if (source.droppableId === "todoTask") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "todoTask") {
      active.splice(destination.index, 0, add);
      warning("Task Is Not Good, You Should Make Again !");
    } else {
      complete.splice(destination.index, 0, add);
    }
    setTodos(active);
    setTodosDone(complete);
    if (active.length === 0) warning("Emty Task, please add new task. Thanks!");
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="text-center fs-1 fw-bolder ">TASKIFY</h1>
        <Row className="justify-content-center">
          <Col xs={8}>
            <div className="position-relative mt-4">
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4 todo">
          <TodoList
            todos={todos}
            setTodos={setTodos}
            type="todo"
            title="todo task"
            droppableId="todoTask"
            bg="dark"
            color="danger"
            setTodosDone={setTodosDone}
          />
          <TodoList
            todos={todosDone}
            setTodos={setTodosDone}
            type="done"
            title="todo task done"
            droppableId="todoDone"
            bg="success"
            color="white"
            setTodosDone={setTodosDone}
          />
        </Row>
      </DragDropContext>
    </>
  );
};

export default TodoTask;
