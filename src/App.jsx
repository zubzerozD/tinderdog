import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { Box, Button, Grid, Paper, Typography, Avatar, ListItem, Container, CircularProgress } from '@mui/material';

import logo from './img/dog.png'

import { useGetDog } from "../quary/Quary.jsx";

function App() {
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: moreDog,
    isFetching: loadings,
    refetch: reload,
    isError: error,
  } = useGetDog();

  const spinner = (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  );

  const handleReject = () => {
    setRejectedDogs([...rejectedDogs, moreDog]);
    setLoading(true);
    reload().finally(() => setLoading(false));
  };

  const handleAccept = () => {
    setAcceptedDogs([...acceptedDogs, moreDog]);
    setLoading(true);
    reload().finally(() => setLoading(false));
  };

  const moveFromRejectedToAccepted = (moreDog) => {
    const newRejectedDogs = rejectedDogs.filter((d) => d !== moreDog);
    setRejectedDogs(newRejectedDogs);
    setAcceptedDogs([...acceptedDogs, moreDog]);
  };

  const moveFromAcceptedToRejected = (moreDog) => {
    const newAcceptedDogs = acceptedDogs.filter((d) => d !== moreDog);
    setAcceptedDogs(newAcceptedDogs);
    setRejectedDogs([...rejectedDogs, moreDog]);
  };

  const content = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
        <img src={moreDog?.image} alt="dog" style={{ width: '200px', height: 200 }} />
      </Box>
      <Typography>
        {moreDog?.name}
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
              {acceptedDogs.map((moreDog) => (
                <Box key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 100, height: 100 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <Button onClick={() => moveFromAcceptedToRejected(moreDog)}>Rechazar</Button>
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
              {rejectedDogs.map((moreDog) => (
                <Box key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 100, height: 100 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <Button onClick={() => moveFromRejectedToAccepted(moreDog)}>Match</Button>
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
