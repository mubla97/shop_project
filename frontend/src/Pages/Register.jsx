import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [surname1, setSurname1] = useState();
  const [surname2, setSurname2] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
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

    if (password != password2) {
      return alert('The two passwords are different');
    }

    if (password.length < 8) {
      return alert('Password must be 8 characters long');
    }

    let UserValidate = UserValidation(username);
    let EmailValidate = EmailValidation(email);
    let PasswordValidate = PasswordValidation(password);

    if (UserValidate && PasswordValidate && EmailValidate) {
      axios.post('http://localhost:8080/signup', {
        username: username,
        email: email,
        name: name,
        surname1: surname1,
        surname2: surname2,
        password: password,
        password2: password2,
        phone: phone,
      }).then(() => {
        window.location = "/login";
      })
        .catch((err) => {
          return alert("Error to register: " + err);
        });
    }

  }

  return (
    <>
      <div className="container h-100">
        <hr />
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
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

                          <label className="form-label" >Last name 1</label>
                          <input type="text" className="form-control" id="surname1" placeholder="Introduce your firts last name..." value={surname1}
                            onChange={e => setSurname1(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" >Last name 2</label>
                          <input type="text" className="form-control" id="surname2" placeholder="Introduce your second last name..." value={surname2}
                            onChange={e => setSurname2(e.target.value)} required />
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

                          <label className="form-label">Repite Password</label>
                          <input type="password" className="form-control" id="password2" placeholder="Repite your password..." value={password2}
                            onChange={e => setPassword2(e.target.value)} required />
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