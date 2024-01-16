import TodoList from "../components/TodoList";
import Header from "../components/Header";
const TodoPage = () => {
  return (
    <>
      <Header />
      <div>Todo Editor</div>
      <div>Todo List</div>
      <TodoList />;
    </>
  );
};

export default TodoPage;
