import React from "react";

const TodoItem = ({ isComplete, value, onClick }) => {
  return (
    <div className="todo-item" data-is-complete={isComplete} onClick={onClick}>
      <p>{isComplete && <span>&#10004;</span>}</p>
      <p>{value}</p>
    </div>
  );
};

export default TodoItem;
