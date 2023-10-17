import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login, logout } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

      dispatch(login(response.data));
      navigate('/profile')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onInput={handleInput} />
        <input type="password" name="password" value={form.password} onInput={handleInput} />
        <button>Submit</button>
      </form>
    </>
  )
}

export default Home
