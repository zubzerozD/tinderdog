import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p className="App-header" />
      <div>
        <img src="https://images.dog.ceo/breeds/terrier-kerryblue/n02093859_3106.jpg" alt="" />
      </div>
      <button>Rechazar</button>   <button>Match</button>
    </div>
  )
}

export default App
