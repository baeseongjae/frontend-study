import GlobalStyle from "./GlobalStyles";
import React, { useState } from "react";
import styled from "styled-components";
import TodoInsertInput from "./components/TodoInsert/TodoInsertInput";
import TodoInsertButton from "./components/TodoInsert/TodoInsertButton";
import AllDeleteButton from "./components/TodoInsert/AllDeleteButton";
import TodoItemList from "./components/TodoList/TodoItemList";
import TodoFooter from "./components/TodoFooter";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleInputValue = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleClickAddTodo = () => {
    if (inputValue !== "") {
      setTodoList((prev) => [
        { isComplete: false, value: inputValue },
        ...prev,
      ]);
      setInputValue("");
    }
  };

  const handleEnterAddTodo = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleClickAddTodo();
    }
  };

  const handleCheckTodo = (index) => {
    setTodoList((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const newItem = Object.assign({}, item);
          newItem.isComplete = !newItem.isComplete;
          return newItem;
        } else {
          return item;
        }
      }),
    );
  };

  const isUncompletedToDo = (todoList) => !todoList.isComplete;

  const restTodo = todoList.filter(isUncompletedToDo).length;

  const handleDeleteAllCompleteTodo = () => {
    setTodoList((prev) => prev.filter(isUncompletedToDo));
  };

  return (
    <TodoWrapper>
      <GlobalStyle />
      <InputContainer>
        <TodoInsertInput
          inputValue={inputValue}
          handleInputValue={handleInputValue}
          handleEnterAddTodo={handleEnterAddTodo}
        />
        <TodoInsertButton handleClickAddTodo={handleClickAddTodo} />
        <AllDeleteButton
          handleDeleteAllCompleteTodo={handleDeleteAllCompleteTodo}
        />
      </InputContainer>
      <TodoItemList todoList={todoList} handleCheckTodo={handleCheckTodo} />
      <TodoFooter restTodo={restTodo} />
    </TodoWrapper>
  );
}

export default App;

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 500px;
  width: 520px;
  border-radius: 10px;
  border: 1px solid #929292e8;
  background: hsl(195, 24%, 6%);
  overflow-y: auto;
  scroll-behavior: smooth;
  filter: drop-shadow(0 0 30px #f1ff2fc5);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-color: hsl(240, 4%, 17%);
  border-bottom: 1px solid #909090;
  padding: 0 20px 0 40px;

  .todo-input {
    background-color: hsl(240, 4%, 17%);
    width: 380px;
    height: 50px;
    border: none;
    border-radius: 7px;
    padding: 3px 10px 3px 0;
    color: #d9d9d9;
    &:focus {
      outline: none;
    }
  }
  .add-button,
  .all-delete-button {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      transform: scale(1.15);
    }
  }
  .add-button {
    margin-left: 10px;
    background: #6cd033;
    font-size: 16px;
  }
  .all-delete-button {
    background: #db716a;
    font-size: 10px;
  }
`;
