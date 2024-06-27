import { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

const Register = () => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPassword_confirmation] = useState();
  const [phone, setPhone] = useState();

  const UserValidation = (username) => {
    return username !== null;
  }
  const EmailValidation = (username) => {
    return username !== null;
  }
  const PasswordValidation = (password) => {
    return password !== null;
  }

  useEffect(() => {
    // Obtener y configurar el token CSRF al cargar la aplicación
    axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true })
      .then(() => {
        console.log('Token CSRF obtenido');
      })
      .catch(error => {
        console.error('Error al obtener el token CSRF:', error);
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
        window.location = "/login";
      })
      .catch(err => {
        console.error(err);
        alert("Error to register: " + err.message);
      });
    }
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

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
                <MDBInput wrapperClass='mb-4' label='First name' id='name' type='text' placeholder="Your first name..."/>
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='lastname' type='text' placeholder="Your last name..."/>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' placeholder="Your username..."/>
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Phone' id='phone' type='number' placeholder="Your phone..."/>
              </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' placeholder="Your email..."/>
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' placeholder="Your password..."/>
            <MDBInput wrapperClass='mb-4' label='Repite Password' id='password_confirmation' type='password' placeholder="Repite your password..."/>

            <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
);
}

export default Register;