import { useEffect, useState } from 'react'
import './App.css'
import 'axios'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

function App() {
  const [imgdog, setImgdog] = useState('')
  const [rejectedDogs, setRejectedDogs] = useState([])
  const [acceptedDogs, setAcceptedDogs] = useState([])

  const getDog = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => setImgdog(data.message))
  }

  useEffect(() => {
    getDog()
  }, [])

  const handleReject = () => {
    setRejectedDogs([...rejectedDogs, imgdog])
    getDog()
  }

  const handleAccept = () => {
    setAcceptedDogs([...acceptedDogs, imgdog])
    getDog()
  }

  const moveFromRejectedToAccepted = (dog) => {
    const newRejectedDogs = rejectedDogs.filter((d) => d !== dog)
    setRejectedDogs(newRejectedDogs)
    setAcceptedDogs([...acceptedDogs, dog])
  }

  const moveFromAcceptedToRejected = (dog) => {
    const newAcceptedDogs = acceptedDogs.filter((d) => d !== dog)
    setAcceptedDogs(newAcceptedDogs)
    setRejectedDogs([...rejectedDogs, dog])
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ width: '30%', minWidth: '250px', mr: 2 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Rechazados
          </Typography>
          {rejectedDogs.map((dog) => (
            <Box key={dog} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
              <img src={dog} alt="rejected-dog" style={{ width: '150px' }} />
              <Button onClick={() => moveFromRejectedToAccepted(dog)}>Match</Button>
            </Box>
          ))}
        </Paper>
      </Box>
      <Box sx={{ width: '70%', minWidth: '250px' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Encuentra tu perro
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
            <img src={imgdog} alt="dog" style={{ width: '250px' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
            <Button variant="contained" onClick={handleReject} sx={{ mr: 2 }}>
              Rechazar
            </Button>
            <Button variant="contained" onClick={handleAccept}>
              Match
            </Button>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: '30%', minWidth: '250px', ml: 2 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Aceptados
          </Typography>
          {acceptedDogs.map((dog) => (
            <Box key={dog} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
              <img src={dog} alt="accepted-dog" style={{ width: '150px' }} />
              <Button onClick={() => moveFromAcceptedToRejected(dog)}>Rechazar</Button>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}

export default App
