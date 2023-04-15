import { useEffect, useState } from 'react'
import './App.css'
import 'axios'

function App() {
  const [imgdog, setImgdog] = useState()

  const getDog = () =>{
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(data => setImgdog(data.message))
  }

  useEffect(() => {
    getDog()
  }, [] )

  return (
    <div className="App">
      <p className="App-header" />
      <div>
        <img src={imgdog} alt="dog" style={{width:"250px"}} />
      </div>
      <button>Rechazar</button>   <button>Match</button>
    </div>
  )
}

export default App
