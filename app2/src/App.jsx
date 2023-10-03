import { useState, useEffect } from 'react'
import Message from './components/Message';
import Table from './components/Table';
import './App.css'

const data = [
  {
    id: 1,
    title: 'Titolo 1',
    desc: 'Desc 1'
  },
  {
    id: 2,
    title: 'Titolo 2',
    desc: 'Desc 2'
  },
  {
    id: 3,
    title: 'Titolo 3',
    desc: 'Desc 3'
  },
  {
    id: 4,
    title: 'Titolo 4',
    desc: 'Desc 4'
  },
]

const posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
]

const App = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  const addNumber = () => {
    setCount(count => {
      return count + number;
    })
  }

  const handleNumber = (e) => {
    setNumber(Number(e.target.value));
  }

  // useEffect(() => {

  // }, [count])

  return (
    <>
      <button onClick={addNumber}>Add</button>
      <input type="number" value={number} onInput={handleNumber} />
      <p>{count}</p>
      <Message count={count} />
      <Table data={data} />
      <Table data={posts} />
    </>
  )
}

export default App
