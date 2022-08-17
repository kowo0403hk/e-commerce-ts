import { FC } from "react";
import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Product from "./pages/Product";
// import ProductList from "./pages/ProductList";
// import Home from "./pages/Home";
import Pay from "./components/Pay";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const App: FC = () => {
  return <Pay />;
};

export default App;
