import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditShop = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { shopId } = useParams();

  const autonomousCommunity = [
    "Andalucía", "Aragón", "Asturias", "Islas Baleares", "Canarias", 
    "Cantabria", "Castilla-La Mancha", "Castilla y León", "Cataluña", 
    "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", 
    "País Vasco", "La Rioja", "Comunidad Valenciana"
  ];

  const redirectToProducts = () => {
    navigate(`/shop/${shopId}/products`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los detalles de la tienda
        const shopResponse = await axios.get(`http://localhost:8080/shop/${shopId}`, {
          withCredentials: true,
        });
        const shopData = shopResponse.data;
        setName(shopData.name);
        setPhone(shopData.phone);
        setAddress(shopData.address);
        setCommunity(shopData.community);
        setPostal_code(shopData.postal_code);
        setJob(shopData.job);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  const updateShop = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`http://localhost:8080/shop/${shopId}`, {
        name,
        phone,
        address,
        community,
        postal_code,
        job,
      }, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/shop");
    } catch (err) {
      console.error(err);
      setError("Error updating shop: " + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
        <h2>Edit Shop</h2>
        <form onSubmit={updateShop}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address:</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={address} 
            onChange={e => setAddress(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Community:</label>
          <select 
            id="community" 
            name="community" 
            value={community} 
            onChange={e => setCommunity(e.target.value)} 
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
          <label>Postal Code:</label>
          <input 
            type="number" 
            id="postal_code" 
            name="postal_code" 
            value={postal_code} 
            onChange={e => setPostal_code(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
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
        <button type="submit" className="btn btn-success btn-lg">
          Save Changes
        </button>
        </form>
      </div>

      <div style={{  maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
        <h2>Settings</h2>
        <button  type="button" className="btn btn-primary btn-lg" onClick={redirectToProducts} style={{ minWidth: '150px', padding: '8px', margin: '5px' }}> Products</button>
        <button type="button" className="btn btn-danger btn-lg" style={{ minWidth: '150px', padding: '8px', margin: '5px' }}> Delete Shop</button>
      </div>

    </>
  );
};

export default EditShop;
