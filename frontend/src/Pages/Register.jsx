import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <>
      <div className="container h-100 mb-3">
        <hr />
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                    <form className="mx-1 mx-md-4" onSubmit={e => { doRegister(e) }}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Username</label>
                          <input type="text" className="form-control" id="username" placeholder="Introduce your username..." value={username}
                            onChange={e => setUsername(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Email</label>
                          <input type="email" className="form-control" id="email" placeholder="Introduce your email..." value={email}
                            onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Name</label>
                          <input type="text" className="form-control" id="name" placeholder="Introduce your name..." value={name}
                            onChange={e => setName(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Last name</label>
                          <input type="text" className="form-control" id="lastname" placeholder="Introduce your firts last name..." value={lastname}
                            onChange={e => setLastname(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Phone</label>
                          <input type="number" className="form-control" id="phone" placeholder="Introduce your phone..." value={phone}
                            onChange={e => setPhone(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label">Password</label>
                          <input type="password" className="form-control" id="password" placeholder="Introduce your password..." value={password}
                            onChange={e => setPassword(e.target.value)} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label">Password confirmation</label>
                          <input type="password" className="form-control" id="password_confirmation" placeholder="Repite your password..." value={password_confirmation}
                            onChange={e => setPassword_confirmation(e.target.value)} required />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 ">
                        <button type="submit" id="signup" className="btn btn-primary btn-lg">Register</button>

                        <div className="d-flex justify-content-center mx-4">
                          <Link to="/"><button type="submit" className="btn btn-warning btn-lg">Go Back</button></Link>
                        </div>
                      </div>
                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;