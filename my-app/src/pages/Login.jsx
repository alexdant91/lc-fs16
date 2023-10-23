import { useDispatch } from "react-redux";
import {login} from "../store/features/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({
        user: "Monica",
        token: "1234",
    }))
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;
