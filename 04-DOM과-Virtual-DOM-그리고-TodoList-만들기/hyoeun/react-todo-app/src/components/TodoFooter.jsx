import React from "react";
import styled from "styled-components";
import Moment from "moment";
import "moment/locale/ko";

const TodoFooter = ({ restTodo }) => {
  const formatDate = Moment().format("YYYY-MM-DD");
  return (
    <FooterContainer>
      <p>Rest : {restTodo}</p>
      <p>{formatDate}</p>
    </FooterContainer>
  );
};

export default TodoFooter;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 20px 40px;
  font-weight: 500;
  font-size: 14px;
  > p {
    color: #e5f410;
    font-weight: 500;
  }
  > p:last-child {
    color: #dddddd;
    font-weight: 500;
  }
`;
