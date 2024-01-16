import { useState } from "react";

import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 4. 할일 검색 기능
  const searchTodos = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={classes.TodoList}>
      <h2>Today's Todos</h2>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleChangeSearch}
      />
      <ul>
        {searchTodos().map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
