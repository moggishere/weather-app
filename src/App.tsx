import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Body from './components/Body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='site-body'>
        <Body />
      </div>

    </>

  )
}

export default App
