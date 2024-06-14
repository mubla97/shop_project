import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../Context/UserContext';
import { Spinner } from "react-bootstrap";

const AddShop = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [job, setJob] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [community, setCommunity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersWithoutShop, setUsersWithoutShop] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const navigate = useNavigate();

  const autonomousCommunity = [
    "Andalucía", "Aragón", "Asturias", "Islas Baleares", "Canarias", 
    "Cantabria", "Castilla-La Mancha", "Castilla y León", "Cataluña", 
    "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", 
    "País Vasco", "La Rioja", "Comunidad Valenciana"
  ];

  let { role } = useContext(UserContext);
  if (role !== 'admin') {
    navigate("/unauthorized");
  }

  // Función para cargar la lista de usuarios sin tienda
  useEffect(() => {
    const fetchUsersWithoutShop = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usersWithoutShop`, {
          withCredentials: true
        });
        setUsersWithoutShop(response.data); 
      } catch (error) {
        console.error('Error fetching users without shop:', error);
      }
    };

    fetchUsersWithoutShop();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/shops`, {
        name,
        phone,
        address,
        job,
        postal_code: postalCode,
        community,
        user_id: selectedUserId
      }, {
        withCredentials: true
      });
      console.log(response.data);
      navigate("/shops");
    } catch (error) {
      console.error('Error creating shop:', error);
      setError('Error creating shop. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Create Shop</h2>
      {loading && ( 
        <div className="mt-4 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && (  
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter shop name..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Phone:</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter phone number..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Address:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Enter address..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Postal Code:</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="Enter postal code..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Job Type:</label>
              <select 
                id="job" 
                name="job" 
                value={job} 
                onChange={e => setJob(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
               <option value="" disabled>Select a job type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Clothing Store">Clothing Store</option>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Cafeteria">Cafeteria</option>
                    <option value="Bookstore">Bookstore</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Hardware Store">Hardware Store</option>
                    <option value="Jewelry Store">Jewelry Store</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Flower Shop">Flower Shop</option>
                    <option value="Hair Salon">Hair Salon</option>
                    <option value="Beauty Salon">Beauty Salon</option>
                    <option value="Electronics Store">Electronics Store</option>
                    <option value="Pet Store">Pet Store</option>
                    <option value="Sporting Goods Store">Sporting Goods Store</option>
                    <option value="Furniture Store">Furniture Store</option>
                    <option value="Mechanic Workshop">Mechanic Workshop</option>
                    <option value="Toy Store">Toy Store</option>
                    <option value="Pastry Shop">Pastry Shop</option>
                    <option value="Ice Cream Shop">Ice Cream Shop</option>
                    <option value="Tobacco Shop">Tobacco Shop</option>
                    <option value="Greengrocery">Greengrocery</option>
                    <option value="Shoe Store">Shoe Store</option>
                    <option value="Optics">Optics</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Photography Studio">Photography Studio</option>
                    <option value="Travel Agency">Travel Agency</option>
                    <option value="Stationery Store">Stationery Store</option>
                    <option value="Video Store">Video Store</option>
                    <option value="Music Store">Music Store</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Community:</label>
              <select 
                id="community" 
                name="community" 
                value={community} 
                onChange={(e) => setCommunity(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                <option value="" disabled>Select a community</option>
                {autonomousCommunity.map((comunidad, index) => (
                  <option key={index} value={comunidad}>{comunidad}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Select User:</label>
              <select 
                value={selectedUserId} 
                onChange={(e) => setSelectedUserId(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                <option value="">Select User</option>
                {usersWithoutShop.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn btn-success btn-lg mt-3">
              {loading ? 'Creating...' : 'Create Shop'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddShop;
