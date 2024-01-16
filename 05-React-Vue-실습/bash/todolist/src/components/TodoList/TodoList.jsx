import { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <h1>TodoList</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(input);
        }}
      >
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
        <li>할일1</li>
        <li>할일2</li>
      </ul>
    </>
  );
};

export default TodoList;
