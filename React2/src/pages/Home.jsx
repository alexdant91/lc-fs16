import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Home = () => {
    const {data, error} = useFetch('https://dummyjson.com/products', {selector:"products"})

    
    return (
        <>
            {
                data && Array.isArray(data) && data.map((product) => (
                        <div style={{marginBottom:"10px"}} key={product.id}>
                            <Link to={`/products/${product.id}`}>
                            <h4>{product.title}</h4>
                            <p>{product.description}</p>
                            </Link>
                        </div>
                    
                ))
            }
        </>
    )
}

export default Home;