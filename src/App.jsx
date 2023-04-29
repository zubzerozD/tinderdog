import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

function App() {
  const [dogBreeds, setDogBreeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [rejectedDogs, setRejectedDogs] = useState([])
  const [acceptedDogs, setAcceptedDogs] = useState([])

  const [dog, setDog] = useState({
    name: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    setLoading(true);
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        setDogBreeds(Object.keys(data.message));
        setLoading(false);
      });
  }, []);

  const getDog = () => {
    setLoading(true);
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        setDog({
          name: dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6),
          image: res.data.message,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet aliquet luctus, nisl nunc aliquam nunc, nec aliquam nisl nunc quis nisl. Sed euismod, diam sit amet aliquet luctus, nisl nunc aliquam nunc, nec aliquam nisl nunc quis nisl."
        });
        setLoading(false);
      });
  }

  useEffect(() => {
    getDog()
  }, [])

  const handleReject = () => {
    setRejectedDogs([...rejectedDogs, dog])
    getDog()
  }

  const handleAccept = () => {
    setAcceptedDogs([...acceptedDogs, dog])
    getDog()
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ width: '30%', minWidth: '250px', mr: 2 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Rechazados
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ width: '70%', minWidth: '250px' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Encuentra tu perro
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
            <img src={dog.image} alt="dog" style={{ width: '250px' }} />
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
        </Paper>
      </Box>
    </Box>
  )
}

export default App