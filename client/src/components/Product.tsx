import { FC } from "react";
import styled from "styled-components";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

const Container = styled.div`
  flex: 1;
  margin: 5ps;
`;

const Circle = styled.div``;

interface ImageProps {
  src: string;
}

const Image = styled.img<ImageProps>``;

const Info = styled.div``;

const Icon = styled.div``;

interface ProductProps {
  item: {
    id: number;
    img: string;
  };
}

const Product: FC<ProductProps> = ({ item }: ProductProps) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
