import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      });
  }

  return (
    <div className="mt-5">
      <div className="container bg-white">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid" alt="Phone img" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h2>Login</h2>
            <form onSubmit={doLogin}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">Email</label>
                <input type="text" id="form1Example13" className="form-control form-control-lg" placeholder="email@email.com..."
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">Password</label>
                <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder="Password..."
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              <div className="d-flex justify-content-center mx-4">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                <div className="d-flex justify-content-center mx-4">
                  <Link to="/"><button type="button" className="btn btn-warning btn-lg btn-block">Go back</button></Link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
