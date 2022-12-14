import { FC, useState, useEffect } from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../helpers/requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgb(10, 186, 181);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid rgb(10, 186, 181);
  background-color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

interface IProductIndividual {
  _id?: number;
  title?: string;
  desc?: string;
  img?: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Product: FC = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState<IProductIndividual>({});

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        // setting up product loading and initial selected color and size for redux state management
        const res = await apiRequest.get(`/products/find/${id}`);
        setProduct(res.data);
        setSelectedColor(res.data.color[0]);
        setSelectedSize(res.data.size[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const mappedColors = product?.color?.map((c: string) => (
    <FilterColor color={c} key={c} onClick={() => setSelectedColor(c)} />
  ));

  const mappedSizes = product?.size?.map((s: string) => (
    <FilterSizeOption key={s}>{s}</FilterSizeOption>
  ));

  const handleQuantity = (command: string) => {
    command === "minus"
      ? quantity > 1 && setQuantity((prev) => (prev -= 1))
      : setQuantity((prev) => (prev += 1));
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, selectedColor, selectedSize }));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Description>{product?.desc}</Description>
          <Price>${(product!.price! / 100).toFixed(2)}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {mappedColors}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedSize(e.target.value)
                }
              >
                {mappedSizes}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                cursor="pointer"
                onClick={() => handleQuantity("minus")}
              />
              <Amount>{quantity}</Amount>
              <Add cursor="pointer" onClick={() => handleQuantity("add")} />
            </AmountContainer>
            <Button onClick={handleClick}>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
