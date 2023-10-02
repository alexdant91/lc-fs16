// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [number, setNumber] = useState(1);

//   const addOne = () => {
//     setCount((count) => {
//       return count + number;
//     });
//   };

//   const handleNumber = (event) => {
//     const value = Number(event.target.value);
//     setNumber(value);
//   };

//   return (
//     <>
//       <div>
//         <p>Counter: {count}</p>
//         <input type="number" value={number} onInput={handleNumber} />
//         <button onClick={addOne}>Add</button>
//       </div>
//     </>
//   );
// };

// export default App;

import { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error ? <div>{error}</div> : <></>}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;

// npm create vite@latest
// Click "yes" to proceed
// project name (...)
// Select a framework: React
// Select a variant: JavaScript

// cd (...project name)
// npm install
// npm run dev
