import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/features/authSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div style={{ marginBottom: '20px', backgroundColor: 'lightgray', padding: '10px' }}>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to='/'>Home</Link>
          <Link to='/profile'>Profile</Link>
          {
            auth.token !== null && (
              <>
                <span style={{marginRight: '10px'}}>{auth.user.first_name}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            )
          }
        </nav>
      </div>
    </>
  )
}

export default Navbar;