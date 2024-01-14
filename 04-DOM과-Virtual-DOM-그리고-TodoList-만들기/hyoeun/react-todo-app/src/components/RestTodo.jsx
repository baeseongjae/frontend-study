import React from "react";
import styled from "styled-components";

const RestTodo = ({ restTodo }) => {
  return (
    <FooterContainer>
      <p>Rest : {restTodo}</p>
    </FooterContainer>
  );
};

export default RestTodo;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 20px 40px;
  > p {
    color: #e5f410;
    font-weight: 700;
  }
`;
