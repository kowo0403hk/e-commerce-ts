import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IFilters {
  categories?: string;
  size?: string;
}

interface ProductsProps {
  cat: string | null;
  filters: IFilters;
  sort: string;
}

interface IProduct {
  _id: number;
  title: string;
  desc: string;
  img: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Products: FC<ProductsProps> = ({ cat, filters, sort }: ProductsProps) => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>([]);

  // for getting all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8080/api/products?category=${cat}`
            : "http://localhost:8080/api/products/"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  // for filtering products by category and filters(types and sizes)
  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item: any) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, cat, filters]);

  // for sorting products
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => b.price - a.price)
      );
    }
  }, [sort]);

  const mappedProducts = filteredProducts.map((item: IProduct) => {
    return <Product item={item} key={item._id} />;
  });

  return <Container>{mappedProducts}</Container>;
};

export default Products;
