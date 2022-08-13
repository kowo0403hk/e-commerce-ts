import { FC } from "react";
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  pading: 20ps;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })}
`;

const Categories: FC = () => {
  const mappedCategoryItems = categories.map((item) => {
    return <CategoryItem key={item.id} item={item} />;
  });

  return <Container>{mappedCategoryItems}</Container>;
};

export default Categories;
