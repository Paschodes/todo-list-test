import React, { ReactElement } from "react";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";

import { ITodo } from "../contexts/Global";
import { useGlobal } from "../contexts/Global";
import Button from "./Buttons";

const TodoLayout = styled.div<{ $light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.background};
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$light ? "rgba(0,0,0,.9)" : "rgba(255,255,255,.9)"};
  }

  & span {
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 0.4px;
  }

  & button {
    background-color: #f7567c;
    border-radius: 8px;
    box-shadow: 0px 0px 20px -5px #ccc;

    & svg {
      font-size: 1.5rem;
    }
  }
`;

type TodoProps = {
  light: boolean;
} & ITodo;

const Todo: React.FC<TodoProps> = ({
  id,
  todo,
  completed,
  light,
}): ReactElement => {
  const { removeTodo, toggleTodo } = useGlobal();

  const removeTodoHandler = (): void => {
    if (removeTodo) removeTodo(id);
  };

  const toggleTodoHandler = (): void => {
    if (toggleTodo) toggleTodo(id);
  };

  return (
    <TodoLayout $light={light}>
      <input type="checkbox" checked={completed} onChange={toggleTodoHandler} />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {todo}
      </span>
      <Button onClick={removeTodoHandler}>
        <AiOutlineDelete />
      </Button>
    </TodoLayout>
  );
};

export default Todo;
