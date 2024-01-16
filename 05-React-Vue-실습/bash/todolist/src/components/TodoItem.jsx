import classes from "./TodoItem.module.css";

const TodoItem = ({ id, text, date, isDone }) => {
  return (
    <>
      <li className={classes.TodoItem}>
        <input type="checkbox" checked={isDone} />
        <div className={classes.text}>{text}</div>
        <div className={classes.date}>
          {new Date(date).toLocaleDateString()}
        </div>
        <button>❌</button>
      </li>
    </>
  );
};

export default TodoItem;
