import { Link, Outlet } from "react-router-dom";

export const DefaultDisplay = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};
