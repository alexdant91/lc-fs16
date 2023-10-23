import { Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
