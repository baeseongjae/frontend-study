import { useState } from "react";

import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeRadio = (e) => {
    if (e.target.value === "filter-completed") {
      setFilter("completed");
    } else if (e.target.value === "filter-incompleted") {
      setFilter("incompleted");
    } else {
      setFilter("all");
    }
  };

  // 3. filter 상태변수에 따라 할일 필터링 로직
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.isDone;
    } else if (filter === "incompleted") {
      return !todo.isDone;
    } else {
      return true;
    }
  });

  // 4. 할일 검색 기능
  const searchTodos = () => {
    if (search === "") {
      return filteredTodos;
    }

    return filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={classes.TodoList}>
      {/* <h2>Today's Todos</h2>/ */}
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleChangeSearch}
      />
      <ul className={classes.radioWrapper}>
        <li>
          <input
            type="radio"
            id="filter-all"
            name="filter"
            value="filter-all"
            required
            onChange={handleChangeRadio}
          />
          <label htmlFor="filter-all">All</label>
        </li>
        <li>
          <input
            type="radio"
            id="filter-completed"
            name="filter"
            value="filter-completed"
            required
            onChange={handleChangeRadio}
          />
          <label htmlFor="filter-completed">Completed</label>
        </li>
        <li>
          <input
            type="radio"
            id="filter-incompleted"
            name="filter"
            value="filter-incompleted"
            required
            onChange={handleChangeRadio}
          />
          <label htmlFor="filter-incompleted">Incompleted</label>
        </li>
      </ul>
      <div></div>
      <ul>
        {searchTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            onToggleTodo={onUpdate}
            onDeleteTodo={onDelete}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
