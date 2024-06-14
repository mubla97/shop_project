import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para cargar los datos del usuario desde el servidor al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`, {
          withCredentials: true
        });
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setName(userData.name);
        setLastname(userData.lastname);
        setPhone(userData.phone);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
      }
    };
    
    fetchUserData();
  }, [userId]);

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password_confirmation) {
      return alert('The two passwords are different');
    }

    if (password.length > 0 && password.length < 8) {
      return alert('Password must be at least 8 characters long');
    }

    try {
      const response = await axios.put(`http://localhost:8080/users/${userId}`, {
        username,
        email,
        name,
        lastname,
        password: password.length > 0 ? password : undefined,
        password_confirmation,
        phone,
      }, {
        withCredentials: true
      });
      console.log(response.data);
      navigate("/users");
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Edit User</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Lastname:</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password Confirmation:</label>
          <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg mt-3">
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
