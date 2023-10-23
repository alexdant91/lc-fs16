import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Default = () => {
  return (
   <>
     <Navbar />
     <div>
        <Outlet />
     </div>
     
   </>
  )
}

export default Default