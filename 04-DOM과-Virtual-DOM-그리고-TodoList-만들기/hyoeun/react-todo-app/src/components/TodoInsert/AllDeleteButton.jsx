import React from "react";

const AllDeleteButton = ({ handleDeleteAllCompleteTodo }) => {
  return (
    <button className="all-delete-button" onClick={handleDeleteAllCompleteTodo}>
      X
    </button>
  );
};

export default AllDeleteButton;
