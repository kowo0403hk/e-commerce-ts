import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: rgb(10, 186, 181);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement: FC = () => {
  return <Container>Speical Sale!! Free Shipping on Orders Over $40</Container>;
};

export default Announcement;
