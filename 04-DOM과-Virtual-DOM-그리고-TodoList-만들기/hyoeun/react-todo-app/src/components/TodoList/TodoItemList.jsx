import React from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoItemList = ({ todoList, handleCheckTodo }) => {
  return (
    <TodoWrapper>
      {todoList.map((toDo, index) => (
        <TodoItem
          key={index}
          isComplete={toDo.isComplete}
          value={toDo.value}
          onClick={() => handleCheckTodo(index)}
        />
      ))}
    </TodoWrapper>
  );
};

export default TodoItemList;

const TodoWrapper = styled.div`
  flex-grow: 1;
  .todo-item {
    display: flex;
    align-items: center;
    height: 50px;
    background: transparent;
    border-bottom: 1px dashed hsl(0, 0%, 35%);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 5px 5px;
    user-select: none;
    cursor: pointer;
    color: hsl(0, 0%, 60.78431372549019%);
    &:hover {
      color: #ee4490;
    }
    & > p:first-child {
      width: 18px;
      height: 18px;
      margin-right: 15px;
    }
    &[data-is-complete="true"] {
      padding: 0 18px;
      color: #ee4490;
      & > p:last-child {
        margin-left: -10px;
        text-decoration: line-through;
      }
    }
  }
`;
