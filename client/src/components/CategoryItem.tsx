import { FC } from "react";
import styled from "styled-components";

const Container = styled.div``;

interface ItemProps {
  id: number;
  img: string;
  title: string;
}

interface CategoryItemProps {
  item: ItemProps;
}

const CategoryItem: FC<CategoryItemProps> = ({ item }) => {
  return <Container>CategoryItem</Container>;
};

export default CategoryItem;
