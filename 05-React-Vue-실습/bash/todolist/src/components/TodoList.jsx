import classes from "./TodoList.module.css";

import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
  return (
    <div className={classes.TodoList}>
      <h2>Today's Todos</h2>
      <input type="text" placeholder="검색어를 입력하세요" />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
