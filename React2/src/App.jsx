import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Products from './pages/Products'

// API_URL = ""

const App = () => {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
          <Route path='' element={<Home/>}/>
          <Route path='products/:id' element={<Products/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
