import {Routes, Route, Link, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { useState } from "react"
import { internalMemory } from "./utility/memory"

const ProtectedRoute = ({children, auth}) => {
  if (auth.token == null) {
    return (
      <Navigate to="/login"/>
    )
  } 
  
  return children;
}

const App = () => {
  const _auth = internalMemory.get("auth")
  const [auth, setAuth] = useState({
     token: _auth?.token || null,
     user: _auth?.user || null,
  });

  const login = (token, user) => {
    setAuth({token, user});
    internalMemory.set("auth", {token, user});
  }

  const logout = () => {
    setAuth({token:null, user:null});
    internalMemory.remove("auth");
  }

  return (
    <>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login login={login}/>} />
        <Route path="/profile" element={
          <ProtectedRoute auth={auth}>
            {/* dati protetti */}
            <Profile auth={auth} logout={logout}/>
          </ProtectedRoute>
        }/>
      </Routes>
      
    </>
  )
}

export default App
