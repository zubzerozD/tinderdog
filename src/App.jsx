import { useEffect, useState } from 'react'
import './App.css'
import 'axios'
import {Box, Grid,button} from '@mui/material'

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
        
      </div>
      <button>Rechazar</button>   <button>Match</button>
    </div>
  )
}

export default App
