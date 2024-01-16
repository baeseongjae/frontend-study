import classes from "./TodoList.module.css";

import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className={classes.TodoList}>
      <input type="text" placeholder="검색어를 입력하세요" />
      <ul>
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ul>
    </div>
  );
};

export default TodoList;
