import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { FC, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

interface ArrowProps {
  direction: string;
}

const Arrow = styled.div<ArrowProps>`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

interface WrapperProps {
  slideIndex: number;
}

const Wrapper = styled.div<WrapperProps>`
  height: 100vh;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
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
  font-size: 20px;
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

  const handleClick = (direction: string): void => {
    direction === "left"
      ? setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1)
      : setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };

  const mappedSilderItems = sliderItems.map((item) => {
    return (
      <Slide bg={item.bg} key={item.id}>
        <ImgContainer>
          <Image src={item.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{item.title}</Title>
          <Description>{item.desc}</Description>
          <Button>SHOW NOW</Button>
        </InfoContainer>
      </Slide>
    );
  });

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined fontSize="large" />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>{mappedSilderItems}</Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined fontSize="large" />
      </Arrow>
    </Container>
  );
};

export default Slider;
