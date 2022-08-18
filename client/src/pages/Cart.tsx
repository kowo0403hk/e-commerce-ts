import { Add, Remove } from "@material-ui/icons";
import { FC } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

interface TopButtonProps {
  filled?: boolean;
}

const TopButton = styled.button<TopButtonProps>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.filled && "none"};
  background-color: ${(props) => (props.filled ? "black" : "transparent")};
  color: ${(props) => props.filled && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  cursor: pointer;
`;

const Description = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetails = styled.span`
  flex: 1;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-weight: 600;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

interface SummaryItemProps {
  total?: boolean;
}

const SummaryItem = styled.div<SummaryItemProps>`
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.total && "500"};
  font-size: ${(props) => props.total && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

interface ReduxCartProduct {
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
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const Cart: FC = () => {
  const cart = useSelector((state: any) => state.cart);

  const mappedCartProducts = cart.products.map((product: ReduxCartProduct) => {
    return (
      <>
        <Product>
          <ProductDetails>
            <Image src={product.img} />
            <Description>
              <ProductName>{product.title}</ProductName>
              <ProductId>
                <strong>ID:</strong> {product._id}
              </ProductId>
              <ProductColor color={product.selectedColor} />
              <ProductSize>
                <strong>Size:</strong> {product.selectedSize}
              </ProductSize>
            </Description>
          </ProductDetails>
          <PriceDetails>
            <ProductAmountContainer>
              <Remove style={{ cursor: "pointer" }} />
              <ProductAmount>{product.quantity}</ProductAmount>
              <Add style={{ cursor: "pointer" }} />
            </ProductAmountContainer>
            <ProductPrice>
              ${((product!.price! * product.quantity) / 100).toFixed(2)}
            </ProductPrice>
          </PriceDetails>
        </Product>
        <Hr />
      </>
    );
  });
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Piggy Cart</Title>
        <Top>
          <TopButton>Continue Picking Piggies</TopButton>
          <TopTexts>
            <TopText>Shopping Cart(2)</TopText>
            <TopText>Your Whislist</TopText>
          </TopTexts>
          <TopButton filled={true}>Checkout</TopButton>
        </Top>
        <Bottom>
          <Info>{mappedCartProducts}</Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 109.98</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>GST</SummaryItemText>
              <SummaryItemPrice>$ 5.50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>PST</SummaryItemText>
              <SummaryItemPrice>$ 7.70</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 21.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$ 21.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem total={true}>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 123.18</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
