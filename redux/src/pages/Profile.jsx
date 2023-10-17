import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";


const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {
        auth.token !== null && (
          <>
            <button onClick={handleLogout}>Logout</button>
            <pre>{JSON.stringify(auth.user, null, 2)}</pre>
          </>
        )
      }
    </>
  ) 
}

export default Profile;