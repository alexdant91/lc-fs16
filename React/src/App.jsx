import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/" element={<DefaultLayout/>}>
          <Route path="" element={<Home/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
