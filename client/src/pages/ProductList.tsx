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
  categories?: string;
  size?: string;
}

const ProductList: FC = () => {
  const location = useLocation();

  const [cat, setCat] = useState<string | null>(
    location.pathname.split("/")[2]
  ); //Pearl or Buchi or Stuffy

  const [filters, setFilters] = useState<IFilters>({});

  const [sort, setSort] = useState("Newest");

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    if (value.includes("All")) {
      setFilters({});
      setCat(null);
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
      if (e.target.name === "categories") {
        setCat(value); // change category and fetch new info
      }
    }
  };

  console.log(filters);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat ? cat.toUpperCase() : "All Piggies"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Piggies:
            <Select name="categories" onChange={handleFilter}>
              <Option disabled>Types</Option>
              <Option>All Types</Option>
              <Option>Pearl</Option>
              <Option>Buchi</Option>
              <Option>Stuffy</Option>
            </Select>
            <Select name="size" onChange={handleFilter}>
              <Option disabled>Sizes</Option>
              <Option>All Sizes</Option>
              <Option>Mini</Option>
              <Option>Micro</Option>
              <Option>Medium</Option>
              <Option>One Size</Option>
            </Select>
          </FilterText>
        </Filter>
        <Filter>
          <FilterText>
            Sort Piggies:
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
