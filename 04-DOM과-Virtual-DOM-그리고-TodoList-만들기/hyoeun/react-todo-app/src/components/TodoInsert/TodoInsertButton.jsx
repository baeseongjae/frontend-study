import React from "react";

const TodoInsertButton = ({ handleClickAddTodo }) => {
  return (
    <button className="add-button" onClick={handleClickAddTodo}>
      +
    </button>
  );
};

export default TodoInsertButton;
