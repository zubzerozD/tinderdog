import { useEffect, useState } from 'react';
import './App.css';
import 'axios';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

function App() {
  const [imgdog, setImgdog] = useState('');
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);

  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => setDogBreeds(Object.keys(data.message)));
  }, []);

  const getDog = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => setImgdog(data.message));
  };

  useEffect(() => {
    getDog();
  }, []);

  const handleReject = () => {
    const randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6);
    const rejectedDog = { name: randomBreed, image: imgdog };
    setRejectedDogs([...rejectedDogs, rejectedDog]);
    getDog();
  };

  const handleAccept = () => {
    const randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6);
    const acceptedDog = { name: randomBreed, image: imgdog };
    setAcceptedDogs([...acceptedDogs, acceptedDog]);
    getDog();
  };

  const moveFromRejectedToAccepted = (dog) => {
    const newRejectedDogs = rejectedDogs.filter((d) => d !== dog);
    setRejectedDogs(newRejectedDogs);
    setAcceptedDogs([...acceptedDogs, dog]);
  };

  const moveFromAcceptedToRejected = (dog) => {
    const newAcceptedDogs = acceptedDogs.filter((d) => d !== dog);
    setAcceptedDogs(newAcceptedDogs);
    setRejectedDogs([...rejectedDogs, dog]);
  };

return (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Rechazados
        </Typography>
        {rejectedDogs.map((dog) => (
          <Box key={dog.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
            <img src={dog.image} alt="rejected-dog" style={{ width: '150px' }} />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {dog.name}
            </Typography>
            <Button onClick={() => moveFromRejectedToAccepted(dog)}>Match</Button>
          </Box>
        ))}
      </Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Encuentra tu perro
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
          <img src={imgdog} alt="dog" style={{ width: '200px' }} />
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
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Aceptados
        </Typography>
        {acceptedDogs.map((dog) => (
          <Box key={dog.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
            <img src={dog.image} alt="accepted-dog" style={{ width: '150px' }} />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {dog.name}
            </Typography>
            <Button onClick={() => moveFromAcceptedToRejected(dog)}>Rechazar</Button>
          </Box>
        ))}
      </Paper>
    </Grid>
  </Grid>
);
}

export default App
