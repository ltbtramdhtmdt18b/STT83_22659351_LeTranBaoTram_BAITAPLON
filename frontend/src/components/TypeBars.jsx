import styled from "styled-components";

const TypeBars = ({ type, onClick, isActive }) => {
  return (
    <TypeWrapper onClick={onClick} isActive={isActive}>
      <TypeName>{type}</TypeName>
    </TypeWrapper>
  );
};

const TypeWrapper = styled.div`
  padding: 7.5px 20px;
  margin-right: 20px;
  font-size: 20px;
  background-color: #dedede;
  border: 1px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const TypeName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export default TypeBars;
