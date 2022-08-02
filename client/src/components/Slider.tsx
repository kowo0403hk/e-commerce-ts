import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: coral
  position: relative;
  overflow: hidden;
`;

interface ArrowProps {
  direction: string;
  handleClick?: (direction: string) => void;
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
bottom: 0;
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 2;`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  transform: translateX(0vw);
`;

interface SlideProps {
  bg: string;
}

const Slide = styled.div<SlideProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

interface ImgProps {
  src: string;
}

const Image = styled.img<ImgProps>`
  src: ${(props) => props.src};
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider: FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: string): void => {};
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined fontSize="large" />
      </Arrow>
      <Wrapper>
        {sliderItems.map((item) => {
          return (
            <Slide bg={item.bg}>
              <ImgContainer>
                <Image src={item.Image} />
              </ImgContainer>
              <InfoContainer>
                <Title>Summer Sale</Title>
                <Description>
                  Don't Compromise on Style! Get a flat 30% off for new
                  arrivals!
                </Description>
                <Button>Shop Now</Button>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined fontSize="large" />
      </Arrow>
    </Container>
  );
};

export default Slider;
