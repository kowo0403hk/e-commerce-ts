import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: coral
  position: relative;
`;

interface ArrowProps {
  direction: string;
}

const Arrow = styled.div<ArrowProps>`
width: 50px;
height: 50px;
background-color: #fff7f7
border-radius: 50%
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left: ${(props) => props.direction === "left" && "10px"};
right: ${(props) => props.direction === "right" && "10px"};
bottom:0;
margin: auto`;

const Slider: FC = () => {
  return (
    <Container>
      <Arrow direction="left">
        <ArrowLeftOutlined />
      </Arrow>
      <Arrow direction="right">
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
