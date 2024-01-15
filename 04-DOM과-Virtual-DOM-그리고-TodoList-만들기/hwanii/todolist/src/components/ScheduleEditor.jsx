import { useRef, useState } from "react";

import classes from "./ScheduleEditor.module.css";

const ScheduleEditor = ({ onCreate }) => {
  const titleInput = useRef();

  const [state, setState] = useState({
    title: "",
    completed: false,
  });

  const handleChangeState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.title.length < 2) {
      titleInput.current.style.borderColor = "red";
      return;
    }
    onCreate(state.title, state.completed);

    titleInput.current.style.borderColor = "gray";
    setState({ title: "", completed: state.completed });
  };

  return (
    <div className={classes.editor}>
      <h1>Udemy</h1>
      <div className={classes.content}>
        <div className={classes.titleInput}>
          <input
            ref={titleInput}
            name="title"
            value={state.title}
            onChange={handleChangeState}
            placeholder={`드루와..드루와!!`}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Add To Do</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditor;
