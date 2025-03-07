import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap"; 
import Button from '@mui/material/Button';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBSpinner,
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

  if (!isLoaded) {
    // Si la página aún no ha cargado, mostrar el spinner
    return (
      <div className="mt-4" style={{ backgroundColor: 'white' }}>
        <div className="text-center">
          <MDBSpinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      </div>
    );
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden container-full-height'>
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
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='name' type='text' placeholder="Your first name..." labelClass="text-white" onChange={(e) => setName(e.target.value)} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='lastname' type='text' placeholder="Your last name..." labelClass="text-white" onChange={(e) => setLastname(e.target.value)} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' placeholder="Your username..." labelClass="text-white" onChange={(e) => setUsername(e.target.value)} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Phone' id='phone' type='number' placeholder="Your phone..." labelClass="text-white" onChange={(e) => setPhone(e.target.value)} />
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' placeholder="Your email..." labelClass="text-white" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' placeholder="Your password..." labelClass="text-white" onChange={(e) => setPassword(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Repite Password' id='password_confirmation' type='password' placeholder="Repite your password..." labelClass="text-white" onChange={(e) => setPassword_confirmation(e.target.value)} />

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
    </MDBContainer>
  );
};

export default Register;
