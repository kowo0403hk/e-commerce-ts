import { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import Pay from "./components/Pay";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const App: FC = () => {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
