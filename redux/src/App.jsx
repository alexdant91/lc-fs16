import { useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./store/features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {
    const {name, value} = e.target;

    setForm(form => ({...form, [name]: value}));
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: {...form}
      })

      dispatch(login(response.data))
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onInput={handleInput} />
        <input type="password" name="password" value={form.password} onInput={handleInput} />
        <button>Submit</button>
      </form>

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

export default App
