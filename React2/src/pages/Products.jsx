import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Products = () => {
    const {id} = useParams();
    
    const {data, error}= useFetch(`https://dummyjson.com/products/${id}`)
    
    return (
        <>
        <h1>Products: {id}</h1>
        <div>
            <pre>{data && JSON.stringify(data, null, 2)}</pre>
          </div>
        </>
    )
}

export default Products;