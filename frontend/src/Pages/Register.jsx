import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap"; 
import Button from '@mui/material/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

const Register = () => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPassword_confirmation] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [isLoaded, setIsLoaded] = useState(false); // Estado para manejar la carga de la página

  const UserValidation = (username) => {
    return username !== null;
  };
  const EmailValidation = (email) => {
    return email !== null;
  };
  const PasswordValidation = (password) => {
    return password !== null;
  };

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

  const doRegister = async (e) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      return alert('The two passwords are different');
    }

    if (password.length < 8) {
      return alert('Password must be 8 characters long');
    }

    let UserValidate = UserValidation(username);
    let EmailValidate = EmailValidation(email);
    let PasswordValidate = PasswordValidation(password);

    if (UserValidate && PasswordValidate && EmailValidate) {
      setLoading(true); // Activar el loading antes de la solicitud

      axios.post('http://localhost:8080/register', {
        username: username,
        email: email,
        name: name,
        lastname: lastname,
        password: password,
        password_confirmation: password_confirmation,
        phone: phone,
      }, {
        withCredentials: true,
      })
      .then(response => {
        console.log(response.data);
        window.location = "/login"; // Redirigir a login después del registro
      })
      .catch(err => {
        console.error(err);
        alert("Error to register: " + err.message);
      })
      .finally(() => {
        setLoading(false); // Desactivar el loading después de la solicitud
      });
    }
  };

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
                <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                  The best offer <br />
                  <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
                </h1>
                <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                  Create your online business and sell your products in the simplest way!
                </p>
              </MDBCol>

              <MDBCol md='6' className='position-relative'>
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong"></div>

                <MDBCard className='my-5 bg-glass position-relative'>
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
                <MDBRow>
                  <MDBCol col='6'>
                    <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                      <label htmlFor="name" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>First name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your first name..."
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </MDBCol>

                  <MDBCol col='6'>
                    <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                      <label htmlFor="lastname" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Last name</label>
                      <input
                        id="lastname"
                        type="text"
                        placeholder="Your last name..."
                        className="form-control"
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol col='6'>
                    <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                      <label htmlFor="username" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Username</label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Your username..."
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </MDBCol>

                  <MDBCol col='6'>
                    <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                      <label htmlFor="phone" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Phone</label>
                      <input
                        id="phone"
                        type="number"
                        placeholder="Your phone..."
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                  <label htmlFor="email" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email..."
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                  <label htmlFor="password" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Your password..."
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4" style={{ display: 'block', textAlign: 'left' }}>
                  <label htmlFor="password_confirmation" className="text-white" style={{ display: 'block', marginBottom: '8px' }}>Repite Password</label>
                  <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite your password..."
                    className="form-control"
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                  />
                </div>

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
                  onClick={doRegister}
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

export default Register;
