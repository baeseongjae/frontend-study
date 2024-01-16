import { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

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
      {/* 할일 목록 렌더링 */}
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
