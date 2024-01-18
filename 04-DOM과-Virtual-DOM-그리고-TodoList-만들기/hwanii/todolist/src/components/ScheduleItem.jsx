import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdModeEdit, MdDelete, MdOutlineSaveAlt } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { SlEmotsmile } from "react-icons/sl";

import classes from "./ScheduleItem.module.css";

const ScheduleItem = ({
  id,
  title,
  completed,
  created_date,
  onRemove,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isComplete, setIsComplete] = useState(completed);
  const [editContent, setEditContent] = useState(title);

  const toggleIsEdit = () => setIsEdit(!isEdit);
  const toggleIsComplete = () => setIsComplete(!isComplete);

  const handleComplete = () => {
    toggleIsComplete();
    onEdit(id, isComplete, title); // editContent 로 하면 아직 초기값이라 안됨
  };

  const handleEdit = () => {
    toggleIsEdit();
    onEdit(id, isComplete, editContent);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className={classes.todoItem}>
      <div className={classes.complete}>
        <button
          onClick={handleComplete}
          style={{
            rotate: isComplete ? "45deg" : "0deg",
            backgroundColor: isComplete ? "#4361ee" : "#747bff",
          }}
        >
          {isComplete ? (
            <FaCheck style={{ rotate: isComplete ? "-45deg" : "0deg" }} />
          ) : (
            <SlEmotsmile />
          )}
        </button>
      </div>
      <div className={classes.title}>
        {isEdit ? (
          <>
            <input
              value={editContent}
              onChange={(event) => {
                setEditContent(event.target.value);
              }}
            />
          </>
        ) : (
          <span
            style={{
              textDecoration: isComplete ? "#5465ff line-through" : "none",
              textDecorationThickness: isComplete ? 2 : 0,
            }}
          >
            {title}
          </span>
        )}
      </div>
      <div>
        <div className={classes.date}>
          {new Date(created_date).toLocaleDateString()}
        </div>
      </div>
      <div className={classes.control}>
        {isEdit ? (
          <>
            <button onClick={handleEdit}>
              <MdOutlineSaveAlt />
            </button>
            <button className={classes.remove} onClick={toggleIsEdit}>
              <ImExit />
            </button>
          </>
        ) : (
          <>
            <button onClick={toggleIsEdit}>
              <MdModeEdit />
            </button>
            <button className={classes.remove} onClick={handleRemove}>
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;
