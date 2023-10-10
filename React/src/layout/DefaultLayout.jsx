import { Link, Outlet } from "react-router-dom";


const DefaultLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    <div>
        <Outlet/>
    </div>
    <footer>
        <p>Footer</p>
    </footer>
    </>
  );
};

export default DefaultLayout;
