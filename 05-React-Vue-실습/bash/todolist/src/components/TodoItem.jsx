import classes from "./TodoItem.module.css";

const TodoItem = ({ id, text, date, isDone, onToggleTodo }) => {
  const handleToggleDone = () => {
    onToggleTodo(id);
  };

  return (
    <>
      <li className={classes.TodoItem}>
        <input type="checkbox" checked={isDone} onChange={handleToggleDone} />
        <div className={`${classes.text} ${isDone ? classes.done : ""}`}>
          {text}
        </div>
        <div className={classes.date}>
          {new Date(date).toLocaleDateString()}
        </div>
        <button>❌</button>
      </li>
    </>
  );
};

export default TodoItem;
