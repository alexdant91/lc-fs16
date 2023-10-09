import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const App = () => {
  const [data, setData] = useState([]);
  const [tbody, setTbody] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getTtotalPages = () => {
    return Math.floor(data.length / limit);
  };

  const hanldeChangeLimit = (event) => {
    const value = event.target.value;
    setLimit(value);
    if (page > getTtotalPages()) {
      setPage(1);
    }
  }

  const changePage = (mode) => {
    if (mode.toUpperCase() == "NEXT") {
      setPage((page) => page + 1);
    } else if (mode.toUpperCase() == "PREV") {
      setPage((page) => page - 1);
    }
  };

  const updatePageUI = () => {
    setTbody([...data].splice(limit * (page - 1), limit));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (response.ok) {
          setData(result);
          // setTbody([...result].splice(0,limit))
        } else {
          throw new Error("Internal Server Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      updatePageUI();
    }
  }, [data, page, limit]);

  return (
    <>
      <div>
        <select value={limit} onChange={hanldeChangeLimit}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <button disabled={page == 1} onClick={() => changePage("PREV")}>
          prev
        </button>
        <span>
          page {page} of {getTtotalPages()}
        </span>
        <button
          disabled={page == getTtotalPages()}
          onClick={() => changePage("NEXT")}
        >
          next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th> id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {tbody &&
            tbody.length > 0 &&
            tbody.map((item) => {
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
