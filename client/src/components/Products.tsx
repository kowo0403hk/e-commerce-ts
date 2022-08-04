import { FC } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
`;

const Products: FC = () => {
  const mappedProducts = popularProducts.map((item) => {
    return <Product item={item} key={item.id} />;
  });

  return <Container>{mappedProducts}</Container>;
};

export default Products;
