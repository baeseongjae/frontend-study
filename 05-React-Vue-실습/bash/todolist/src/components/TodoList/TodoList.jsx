import { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // 할일 추가 로직 함수
  const addTodo = (e) => {
    if (input.trim() === "") {
      alert("다시 입력하세요");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input,
    };

    e.preventDefault();
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // 진행상태 토글 로직
  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // filter 상태변수에 따라 할일 필터링 진행
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return !todo.completed;
    } else if (filter === "incompleted") {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={addTodo}>
        <input
          value={input}
          type="text"
          placeholder="할일을 입력하세요"
          onChange={(e) => setInput(e.target.value)}
        />
        <button>추가</button>
      </form>
      <div>
        <button onClick={() => setFilter("all")}>전체</button>
        <button onClick={() => setFilter("incompleted")}>미완료</button>
        <button onClick={() => setFilter("completed")}>완료</button>
      </div>

      {/* 할일 목록 렌더링 */}
      <ul>
        {filteredTodos.map((item) => (
          <li
            key={item.id}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
            <button onClick={() => toggleTodo(item.id)}>check</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
