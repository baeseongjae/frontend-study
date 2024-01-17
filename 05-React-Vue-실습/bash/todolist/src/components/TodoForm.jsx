import { useState, useRef } from "react";

import classes from "./TodoForm.module.css";
import { FaPlus } from "react-icons/fa";

const TodoForm = ({ onAddTodo }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (input === "") {
      inputRef.current.focus();
      return;
    }
    e.preventDefault();
    onAddTodo(input);
    setInput("");
  };

  return (
    <form className={classes.TodoForm} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={input}
        type="text"
        placeholder="할일을 입력하세요"
        onChange={handleChangeInput}
      />
      <button>
        <FaPlus className={classes.plusIcon} />
      </button>
    </form>
  );
};

export default TodoForm;
