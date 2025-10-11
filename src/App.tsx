import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='container'>
      <div className='row'>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
     </div>
    </>
  )
}

export default App
