import React, { FC, useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/login.jpeg?raw=true)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.input`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(10, 186, 181);
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

interface IUser {
  username?: string;
  password?: string;
}

const Login: FC = () => {
  const [user, setUser] = useState<IUser>({});
  const { username, password } = user;
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state: any) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="username"
            name="username"
            value={user.username ? user.username : ""}
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={user.password ? user.password : ""}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={handleClick}
            value="Login"
            disabled={isFetching}
          />
          {error && <Error>Something went wrong...</Error>}
          <Link>Forgot password?</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
