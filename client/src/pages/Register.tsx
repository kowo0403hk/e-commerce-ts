import React, { FC, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/register.jpeg?raw=true)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(10, 186, 181);
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

const Registered = styled.div`
  color: green;
`;

interface INewUser {
  username?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}

const Register: FC = () => {
  const [newUser, setNewUser] = useState<INewUser>({});
  const { username, email, password, confirmedPassword } = newUser;
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registeredMsg, setRegisteredMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisteredMsg("");
    setRegistered(false);
    setErrorMsg("");
    setError(false);
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmedPassword) {
      setError(true);
      setErrorMsg("Please complete all the fields");
    } else if (password !== confirmedPassword) {
      setError(true);
      setErrorMsg("Please ensure passwords are the same.");
    } else {
      setRegistered(true);
      setRegisteredMsg("User registered successfully");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input
            name="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            name="confirmedPassword"
            type="password"
            placeholder="confirm password"
            value={confirmedPassword}
            onChange={handleChange}
          />
          {error && <Error>{errorMsg}</Error>}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {registered && <Registered>{registeredMsg}</Registered>}
          <Button onClick={handleClick}>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
