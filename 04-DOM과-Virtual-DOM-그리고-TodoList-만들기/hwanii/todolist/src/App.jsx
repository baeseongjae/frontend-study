import {
  // createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import ScheduleEditor from "./components/ScheduleEditor.jsx";
import ScheduleList from "./components/ScheduleList.jsx";

import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "UPDATE": {
      return state.map((todo) =>
        todo.id === action.targetId
          ? { ...todo, title: action.newTitle, completed: action.completed }
          : todo,
      );
    }
    case "DELETE": {
      return state.filter((todo) => todo.id !== action.targetId);
    }
    default:
      return state;
  }
};

// export const TodoStateContext = createContext();
//
// export const TodoDispatchContext = createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // api 호춣
  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos").then(
      (res) => res.json(),
    );

    const initData = res.slice(0, 4).map((todo) => {
      return {
        id: dataId.current++,
        title: todo.title,
        completed: todo.completed,
        created_date: new Date().getTime(),
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  // Mount 시점에만 가져오도록 설정
  useEffect(() => {
    getData();
  }, []);

  //CREATE
  const onCreate = useCallback((title, completed) => {
    dispatch({
      type: "CREATE",
      data: { title, completed, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  //Delete
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  //UPDATE
  const onEdit = useCallback((targetId, isComplete, newTitle) => {
    dispatch({ type: "UPDATE", targetId, isComplete, newTitle });
  }, []);

  return (
    <div className="App">
      <ScheduleEditor onCreate={onCreate} />
      <ScheduleList todos={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
