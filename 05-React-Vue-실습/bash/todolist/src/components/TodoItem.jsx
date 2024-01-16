import classes from "./TodoItem.module.css";

const TodoItem = () => {
  return (
    <>
      <li className={classes.TodoItem}>
        <input type="checkbox" />
        <div className={classes.text}>투두</div>
        <div className={classes.date}>작성일</div>
        <button>삭제</button>
      </li>
    </>
  );
};

export default TodoItem;
