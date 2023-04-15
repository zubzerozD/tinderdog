import { useEffect, useState } from 'react'
import './App.css'
import 'axios'
import {Grid, Button} from '@mui/material'

function App() {
  const [imgdog, setImgdog] = useState()
  const [rejectedDogs, setRejectedDogs] = useState([])
  const [acceptedDogs, setAcceptedDogs] = useState([])

  const getDog = () =>{
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(data => setImgdog(data.message))
  }

  const handleReject = () => {
    setRejectedDogs([...rejectedDogs, imgdog])
    getDog()
  }

  const handleMatch = () => {
    setAcceptedDogs([...acceptedDogs, imgdog])
    getDog()
  }

  useEffect(() => {
    getDog()
  }, [] )

  return (
    <div className="App">
      <p className="App-header" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Rechazados</h2>
          {rejectedDogs.map((dog, index) => (
            <div key={index}>
              <img src={dog} alt="rejected dog" style={{width:"250px"}} />
            </div>
          ))}
        </Grid>
        <Grid item xs={6}>
          <h2>Aceptados</h2>
          {acceptedDogs.map((dog, index) => (
            <div key={index}>
              <img src={dog} alt="accepted dog" style={{width:"250px"}} />
            </div>
          ))}
        </Grid>
      </Grid>
      <div>
        <img src={imgdog} alt="dog" style={{width:"250px"}} />
      </div>
      <Button onClick={handleReject}>Rechazar</Button>   <Button onClick={handleMatch}>Match</Button>
    </div>
  )
}

export default App

