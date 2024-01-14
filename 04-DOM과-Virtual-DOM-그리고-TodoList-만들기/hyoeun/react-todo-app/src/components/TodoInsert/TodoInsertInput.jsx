import React from "react";

const TodoInsertInput = ({
  inputValue,
  handleInputValue,
  handleEnterAddTodo,
}) => {
  return (
    <input
      type="text"
      placeholder="Your Todo List"
      className="todo-input"
      value={inputValue}
      onChange={handleInputValue}
      onKeyPress={handleEnterAddTodo}
    />
  );
};

export default TodoInsertInput;
