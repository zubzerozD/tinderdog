import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { Box, Button, Grid, Paper, Typography, Avatar, ListItem, Container, CircularProgress } from '@mui/material';

import logo from './img/dog.png'

function App() {
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dog, setDog] = useState({
    name: "",
    image: "",
    description: "",
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
    axios.get('https://dog.ceo/api/breeds/image/random').then((res) => {
      setDog({
        name: dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6),
        image: res.data.message });
      setLoading(false);
    });

  };

  const spinner = (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  );


  useEffect(() => {
    getDog();
  }, []);

  const handleReject = () => {
    setRejectedDogs([...rejectedDogs, dog]);
    getDog();
  };

  const handleAccept = () => {
    setAcceptedDogs([...acceptedDogs, dog]);
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

  const content = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
        <img src={dog.image} alt="dog" style={{ width: '200px', height: 200 }} />
      </Box>
      <Typography>
        {dog.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
        <Button variant="contained" onClick={handleReject} sx={{ mr: 2 }}>
          Rechazar
        </Button>
        <Button variant="contained" onClick={handleAccept}>
          Match
        </Button>
      </Box>
    </>
  );

  return (
    <Container className="background">
      <Grid container spacing={3}>
        <Grid style={{}} item xs={12} sm={4}>
          <Paper style={{ opacity: 0.9, borderRadius: 25, height: 555, width: 165 }} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', mt: 7 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -2 }}>
              <img className="logo" src={logo} alt="zd" />
            </Box>
            <Typography variant="h5" gutterBottom>
              Encuentra tu perro
            </Typography>
            {loading ? spinner : content}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItem className="list-item">
            <Paper style={{ opacity: 0.9, height: 550, overflowY: "auto", borderRadius: 25 }} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', mt: 7 }}>
              <Typography variant="h5" gutterBottom>
                Aceptados
              </Typography>
              {acceptedDogs.map((dog) => (
                <Box key={dog.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={dog.image}
                    sx={{ width: 100, height: 100 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {dog.name}
                  </Typography>
                  <Button onClick={() => moveFromAcceptedToRejected(dog)}>Rechazar</Button>
                </Box>
              ))}
            </Paper>
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItem className="list-item">
            <Paper style={{ opacity: 0.9, height: 550, overflowY: "auto", borderRadius: 25 }} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', mt: 7 }}>
              <Typography variant="h5" gutterBottom>
                Rechazados
              </Typography>
              {rejectedDogs.map((dog) => (
                <Box key={dog.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={dog.image}
                    sx={{ width: 100, height: 100 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {dog.name}
                  </Typography>
                  <Button onClick={() => moveFromRejectedToAccepted(dog)}>Match</Button>
                </Box>
              ))}
            </Paper>
          </ListItem>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App
