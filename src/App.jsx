import { Route, Routes } from "react-router-dom";
import { DefaultDisplay } from "./Layout/DefaultDisplay";
import { Products } from "./Pages/Products";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultDisplay />}>
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
