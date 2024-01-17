import classes from "./TodoItem.module.css";

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
        <button onClick={handleDeleteTodo}>❌</button>
      </li>
    </>
  );
};

export default TodoItem;
