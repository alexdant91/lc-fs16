import { useEffect, useInsertionEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App( {id, title, type, children})  {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    if (count == 2) {
       console.log("USE EFFECT")
      }
  }, [count, count2]) 

  if (count == 0) {
    return (
      <>
      <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </>
    )
  }
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount2((count) => count + 1)}>
          count2 is {count2}
        </button>
        {
          count > 10 ? (
            <p>
              Count is over 10
            </p>
          ) : (
              <>
                <p>
                  click button
                </p>
                <p>
                  click button
                </p>
              </>
            )
          
        }
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
