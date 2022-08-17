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

interface IProducts {
  id: number;
  title: string;
  desc: string;
  img: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createAt?: Date;
  updateAt?: Date;
}

const Products: FC<ProductsProps> = ({ cat, filters, sort }: ProductsProps) => {
  const [products, setProducts] = useState<IProducts[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[] | []>(
    []
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8080/api/products?category=${cat}`
            : "http://localhost:8080/api/products/"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item: any) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  const mappedProducts = filteredProducts.map((item: IProducts) => {
    return <Product item={item} key={item.id} />;
  });

  return <Container>{mappedProducts}</Container>;
};

export default Products;
