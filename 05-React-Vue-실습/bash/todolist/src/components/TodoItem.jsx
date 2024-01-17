import classes from "./TodoItem.module.css";
import { FaTrashAlt } from "react-icons/fa";

const TodoItem = ({ id, text, date, isDone, onToggleTodo, onDeleteTodo }) => {
  const handleToggleDone = () => {
    onToggleTodo(id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(id);
  };

  return (
    <>
      <li className={classes.TodoItem}>
        <input
          className={classes.todoCheckbox}
          type="checkbox"
          checked={isDone}
          onChange={handleToggleDone}
        />
        <div className={`${classes.text} ${isDone ? classes.done : ""}`}>
          {text}
        </div>
        <div className={classes.date}>
          {new Date(date).toLocaleDateString()}
        </div>
        <button onClick={handleDeleteTodo}>
          <FaTrashAlt className={classes.trash} />
        </button>
      </li>
    </>
  );
};

export default TodoItem;
