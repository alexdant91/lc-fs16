import { useSelector } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector(state => state.auth);
  if (auth.token === null) {
    return <Navigate to='/' />
  }
  return children;
}

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App;