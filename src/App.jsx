import { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Grid, Paper, Typography, Avatar, ListItem, Container, CircularProgress } from '@mui/material';
import ProfileMore from '../profile/profile';

//Logo
import logo from './img/dog.png'

//Query del perro
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
    setAcceptedDogs([moreDog, ...acceptedDogs]);
  };

  const moveFromAcceptedToRejected = (moreDog) => {
    const newAcceptedDogs = acceptedDogs.filter((d) => d !== moreDog);
    setAcceptedDogs(newAcceptedDogs);
    setRejectedDogs([moreDog, ...rejectedDogs]);
  };

  //Contenido de cargar
  const content = (
    <Box>
      <Box className="caja">
        <img src={moreDog?.image} alt="dog" style={{ width: '200px', height: '200px' }} />
      </Box>
      <Typography className='nameDog'>
        Nombre: {moreDog?.name}
      </Typography>
      <Typography className='lotum'>
        Descripcion:{moreDog?.description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button className='button-X' variant="contained" onClick={handleReject} sx={{ mr: 2 }} />
        <button className='button-Match' variant="contained" onClick={handleAccept} />
      </Box>
    </Box>
  );
  //console.log(moreDog)

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
          <Box className="liked_top">
            <img src="../src/img/dogLike.jpg" alt="liked" />
          </Box>
          <ListItem className='lista'>
            <Box className='contenidos-aceptados'>
              {acceptedDogs.map((moreDog) => (
                <Box className="aD" key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <button className='button_AtoR' onClick={() => moveFromAcceptedToRejected(moreDog)}></button>
                  <ProfileMore data={moreDog}></ProfileMore>
                </Box>
              ))}
            </Box>
          </ListItem>
        </Box>

        {/* Columna Rechazados */}
        <Box className="columna rechazados">
          <Box className="X-liked_top">
            <img src="../src/img/dogDislike.png" alt="X-liked"/>
          </Box>
          <ListItem className='lista'>

            <Box className='contenidos-rechazados'>
              {rejectedDogs.map((moreDog) => (
                <Box className="rD" key={moreDog?.image} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                  <Avatar
                    src={moreDog?.image}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {moreDog?.name}
                  </Typography>
                  <button className='button_RtoA' onClick={() => moveFromRejectedToAccepted(moreDog)}></button>
                  <ProfileMore data={moreDog}></ProfileMore>
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
