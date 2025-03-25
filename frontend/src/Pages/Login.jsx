//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import Button from '@mui/material/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} 
from 'mdb-react-ui-kit';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [isLoaded, setIsLoaded] = useState(false); // Estado para manejar la carga de la página

  useEffect(() => {
    // Obtener y configurar el token CSRF al cargar la aplicación
    axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true })
      .then(() => {
        console.log('Token CSRF obtenido');
        setIsLoaded(true); // Cambiar el estado a true después de cargar los datos
      })
      .catch(error => {
        console.error('Error al obtener el token CSRF:', error);
        setIsLoaded(true); // Aunque haya un error, puedes permitir que la página se cargue después de intentar obtener el token.
      });
  }, []);

  const doLogin = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/login', {
      email: email,
      password: password,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("email", email);
        window.location = "/";
      })
      .catch((err) => {
        if (err.response) {
          console.error('Error de respuesta del servidor:', err.response.data);
          alert("Error de respuesta del servidor: " + err.response.data.message);
        } else if (err.request) {
          console.error('Error en la solicitud:', err.request);
          alert("Error en la solicitud: " + err.message);
        } else {
          console.error('Error:', err.message);
          alert("Error: " + err.message);
        }
      })
      .finally(() => {
        setLoading(false); // Desactivar el loading después de la solicitud
      });
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden container-full-height'>
          <div className="mt-4">
            {!isLoaded ? (
            <div className="text-center">
                <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden" style={{backgroundColor:"black", color:"white"}}>Loading...</span>
                </Spinner>
            </div>
            ) : (
            <>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(0, 0.00%, 100.00%)'}}>
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Create your online business and sell your products in the simplest way!
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong"></div>
       
        <MDBCard className='my-5  bg-glass position-relative'>
          {/* Fondo desenfocado */}
          <div
            style={{
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'black', // Fondo negro o cualquier color o imagen que desees
              filter: 'blur(10px)', // Efecto de desenfoque
              zIndex: -1, // Asegura que el fondo quede detrás del contenido
            }}
          ></div>

          {/* Contenido de la tarjeta que NO se desenfoca */}
          <MDBCardBody className='p-5 position-relative'>
            <MDBInput
              wrapperClass='mb-4'
              label='Email'
              id='form1'
              type='email'
              placeholder="email@email.com"
              labelClass="text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='form1'
              type='password'
              placeholder="your password..."
              labelClass="text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <Button
              className="w-100 mb-4 d-flex justify-content-center align-items-center"
              size="md"
              style={{
                height: '50px',
                padding: '0.5rem',
                position: 'relative',
                backgroundColor: '#007bff', // Azul personalizado
                borderColor: '#007bff', // Asegura que el borde sea del mismo color
                color: '#fff', // Color del texto blanco
                borderRadius: '0.25rem', // Opcional: bordes redondeados
                fontWeight: 'bold'
              }}
              onClick={doLogin}
              disabled={loading} // Deshabilitar el botón mientras se carga
            >
              <div className="w-100 d-flex justify-content-center align-items-center ">Sign up</div>
            </Button>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>

      </MDBRow>
      </>
      )}   
      </div>
    </MDBContainer>
  );
};

export default Login;
