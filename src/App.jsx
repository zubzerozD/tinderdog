import { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Grid, Paper, Typography, Avatar, ListItem, Container, CircularProgress } from '@mui/material';

import logo from './img/dog.png'

import { useGetDog } from "../quary/Quary.jsx";

function App() {
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: moreDog,
    //isFetching: loadings,
    refetch: reload,
    //isError: error,
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
    <Box>
      <Box>
        <img src={moreDog?.image} alt="dog" style={{ width: '200px', height: '200px' }} />
      </Box>
      <Typography>
        {moreDog?.name}
      </Typography>
      <Typography>
        {moreDog?.description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <button className='button-X' variant="contained" onClick={handleReject} sx={{ mr: 2 }} />
        <button className='button-Match' variant="contained" onClick={handleAccept} />
      </Box>
    </Box>
  );
  console.log(moreDog)
  return (
    <Container className="background">

      {/* Contenedor */}
      <Box className="contenido">

        {/* Columna perfiles */}
        <Box className="columna profile">

          <Box >
            <Box >
              <img className="logo" src={logo} alt="zd" />
            </Box>
            <Typography variant="h5" gutterBottom>
              Encuentra tu perro
            </Typography>
            {loading ? spinner : content}
          </Box>
        </Box>

        {/* Columna Aceptados */}
        <Box className="columna aceptados">
          <ListItem className='lista'>
            <Box className='contenidos-aceptados'>
              <Typography variant="h5" >
                  Aceptados
              </Typography>
              {acceptedDogs.map((moreDog) => (
                <Box key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <Button onClick={() => moveFromAcceptedToRejected(moreDog)}>Rechazar</Button>
                </Box>
              ))}
            </Box>
          </ListItem>
        </Box>

        {/* Columna Rechazados */}
        <Box className="columna rechazados">
          <ListItem className='lista'>

            <Box className='contenidos-rechazados'>
              <Typography variant="h5" gutterBottom>
                Rechazados
              </Typography>
              {rejectedDogs.map((moreDog) => (
                <Box key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <Button onClick={() => moveFromRejectedToAccepted(moreDog)}>Match</Button>
                </Box>
              ))}
            </Box>

          </ListItem>
        </Box>

      </Box>

    </Container>
  );
}


export default App
