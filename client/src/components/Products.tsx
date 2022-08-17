import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IFilters {
  color?: string;
  size?: string;
}

interface ProductsProps {
  cat: string;
  filters: IFilters;
  sort: string;
}

const Products: FC<ProductsProps> = ({ cat, filters, sort }: ProductsProps) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {}, [cat]);

  const mappedProducts = popularProducts.map((item) => {
    return <Product item={item} key={item.id} />;
  });

  return <Container>{mappedProducts}</Container>;
};

export default Products;
