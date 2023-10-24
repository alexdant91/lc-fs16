import { useFetch } from "../Hooks/useFetch";

export const Products = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://dummyjson.com/products", { selector: "products" });

  if (loading) return <h2>Loading...</h2>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            {products.length > 0 &&
              Object.keys(products[0]).map((key, index) => {
                return <th key={`table-th-${index}`}>{key}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <tr key={`table-tr-${product.id}`}>
                  {Object.values(product).map((value, index) => {
                    return (
                      <td key={`table-tr-${product.id}-td-${index}`}>
                        {Array.isArray(value) ? value.length : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
