import { Add, Remove } from "@material-ui/icons";
import { FC } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
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

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const ProductPrice = styled.div`
  font-weight: 600;
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

const Cart: FC = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shopping Cart(2)</TopText>
            <TopText>Your Whislist</TopText>
          </TopTexts>
          <TopButton filled={true}>Checkout</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetails>
                <Image src="https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/shoe.png?raw=true" />
                <Description>
                  <ProductName>
                    <strong>Product:</strong> RUNNER SHOES
                  </ProductName>
                  <ProductId>
                    <strong>ID:</strong> 1234567
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <strong>Size:</strong> 39
                  </ProductSize>
                </Description>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Remove style={{ cursor: "pointer" }} />
                  <ProductAmount>1</ProductAmount>
                  <Add style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <ProductPrice>$79.99</ProductPrice>
              </PriceDetails>
            </Product>
            <Hr />
            <Product>
              <ProductDetails>
                <Image src="https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/t-shirt.png?raw=true" />
                <Description>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Description>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Remove style={{ cursor: "pointer" }} />
                  <ProductAmount>1</ProductAmount>
                  <Add style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <ProductPrice>$ 29.99</ProductPrice>
              </PriceDetails>
            </Product>
          </Info>
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
