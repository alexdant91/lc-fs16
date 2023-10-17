import { useState } from "react"
import {useNavigate} from 'react-router-dom'

const Login = ({login}) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password:"",
    });

    const handleInput = (event) => {
        const {name, value} = event.target;
        setForm((form) => {
            return {
                ...form,
                [name]: value
            }
        })
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (response.ok) {
                login(result.token, result.user);
                navigate("/profile");
            } else {
                console.log(result)
            }
        } catch(error) {
            console.log(error)
        }
        
    }

    return ( 
        <>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" onInput={handleInput} value={form.email} />
                    <input type="password" name="password" onInput={handleInput} value={form.password} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </> 
        
    ) 
}

export default Login