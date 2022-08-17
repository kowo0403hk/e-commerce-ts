import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-left: 20px;
  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

interface IFilters {
  color?: string;
  size?: string;
}

const ProductList: FC = () => {
  const location = useLocation();

  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState<IFilters>({});

  const [sort, setSort] = useState("Newest");

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    value.includes("All")
      ? setFilters({ ...filters, [e.target.name]: "" })
      : setFilters({
          ...filters,
          [e.target.name]: value,
        });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products:
            <Select name="color" onChange={handleFilter}>
              <Option disabled>Colors</Option>
              <Option>All Colors</Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select name="size" onChange={handleFilter}>
              <Option disabled>Sizes</Option>
              <Option>All Sizes</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </FilterText>
        </Filter>
        <Filter>
          <FilterText>
            Sort Products:
            <Select onChange={handleSort}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price - Ascending</Option>
              <Option value="desc">Price - Descending</Option>
            </Select>
          </FilterText>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
