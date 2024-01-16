import { useState, useRef } from "react";

import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const idRef = useRef(1);

  // 1. 할일 추가 로직 함수
  const addTodo = (input) => {
    const newTodo = {
      id: idRef.current++,
      text: input,
      date: Date.now(),
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 2. 진행상태 토글 로직
  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === index ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  // 3. filter 상태변수에 따라 할일 필터링 진행
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "incompleted") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  // 5. 할일 삭제 기능
  const deleteTodo = (id) => {
    // 타겟 인덱스 찾기
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      // 복사본 만들기
      const updatedTodos = [...todos];
      // 자르기
      updatedTodos.splice(index, 1);
      // 원본배열에 업데이트하기
      setTodos(updatedTodos);
    }
  };

  return (
    <>
      <Header />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onUpdate={toggleTodo} />
      {/* <div>
        <button onClick={() => setFilter("all")}>전체</button>
        <button onClick={() => setFilter("incompleted")}>미완료</button>
        <button onClick={() => setFilter("completed")}>완료</button>
      </div>
      <input
        value={keyword}
        type="text"
        placeholder="검색하고 싶은 할일을 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
      /> */}

      {/* 할일 목록 렌더링 */}
      {/* <ul>
        {searchedTodos().map((item) => (
          <li
            key={item.id}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
            <button onClick={() => toggleTodo(item.id)}>check</button>
            <button onClick={() => deleteTodo(item.id)}>❌</button>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default TodoPage;
