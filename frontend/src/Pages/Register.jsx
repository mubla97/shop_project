import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBInput} from 'mdb-react-ui-kit';

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
      .then(() => {
        window.location = "/login";
      })
        .catch((err) => {
          return alert("Error to register: " + err);
        });
    }
  }

  return (
<MDBContainer fluid className='bg-dark'>
  <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    <MDBCol>
      <MDBCard className='my-4'>
        <MDBRow className='g-0'>
          <MDBCol md='6' className="d-none d-md-block">
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start" fluid/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
            <form onSubmit={doRegister}>
              <h3 className="mb-5 text-uppercase fw-bold">Register</h3>
              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='form1' type='text' value={name} onChange={e => setName(e.target.value)}/>
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text' value={lastname} onChange={e => setLastname(e.target.value)}/>
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Username' size='lg' id='form4' type='text' value={username} onChange={e => setUsername(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='text' value={email} onChange={e => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='phone' size='lg' id='form5' type='number' value={phone} onChange={e => setPhone(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='password' size='lg' id='form6' type='pasword' value={password} onChange={e => setPassword(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='password confirmation' size='lg' id='form6' type='pasword' value={password_confirmation} onChange={e => setPassword_confirmation(e.target.value)}/>
              <div className="d-flex justify-content-end pt-3">
                <Link to="/"><button type="button" className="btn btn-light btn-lg btn-block">Go back</button></Link>
                <MDBBtn className='ms-2' color='warning' size='lg'>Register</MDBBtn>
              </div>
            </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer>

  );
};

export default Register;