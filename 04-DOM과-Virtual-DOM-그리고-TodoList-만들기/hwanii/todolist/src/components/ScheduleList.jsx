import classes from "./ScheduleList.module.css";
import ScheduleItem from "./ScheduleItem.jsx";

const ScheduleList = ({ todos, onRemove, onEdit }) => {
  return (
    <div className={classes.todoList}>
      <div className={classes.listTitle}>
        <h4>TodoList {todos.length > 4 ? "(그만해...)" : ""}</h4>
        <span>Total: {todos.length}</span>
      </div>
      <div className={classes.items}>
        {todos.map((todo) => (
          <ScheduleItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            created_date={todo.created_date}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

ScheduleList.defaultProps = {
  todos: [],
};

export default ScheduleList;
