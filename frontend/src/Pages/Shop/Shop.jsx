import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Shop = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [job, setJob] = useState('');
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const autonomousCommunity = [
    "Andalucía", "Aragón", "Asturias", "Islas Baleares", "Canarias", 
    "Cantabria", "Castilla-La Mancha", "Castilla y León", "Cataluña", 
    "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", 
    "País Vasco", "La Rioja", "Comunidad Valenciana"
  ];

  useEffect(() => {
    const checkShop = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hasShop', {
          withCredentials: true,
        });
        if (response.data.hasShop) {
          console.log(response.data);
          navigate(`/shop/${response.data.shopId}`);
        } else {
          console.log('No existe una tienda');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching shop status:', error);
        setLoading(false);
      }
    };

    checkShop();
  }, [navigate]);

  const doShop = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear un FormData para enviar todos los datos
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('community', community);
      formData.append('postal_code', postal_code);
      formData.append('job', job);
      if (image) {
        formData.append('shopImage', image);
      }

      // Enviar todos los datos al servidor
      const response = await axios.post('http://localhost:8080/shop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      console.log('Shop created successfully:', response.data);

      // Redirigir a la página de la tienda creada o actualizar la página
      navigate(`/shop/${response.data.shop.id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating shop: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);

    // Mostrar la previsualización de la imagen
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDisplay(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setCommunity(e.target.value);
  };

  if (loading) {
    return (
      <div className="mt-4">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Create Shop</h2>
      <form onSubmit={doShop}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="community">Community</label>
          <select
            id="community"
            name="community"
            value={community}
            onChange={handleChange}
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
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="number"
            id="postal_code"
            name="postal_code"
            value={postal_code}
            onChange={(e) => setPostal_code(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="job">Job Type</label>
          <select
            id="job"
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
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
            <option value="Travel Agency">Travel Agency</option>
            <option value="Photography Studio">Photography Studio</option>
            <option value="Laundry">Laundry</option>
            <option value="Dry Cleaner">Dry Cleaner</option>
            <option value="Health Food Store">Health Food Store</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="image">Upload Shop Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={changeHandler}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {display && (
          <div style={{ marginBottom: '10px' }}>
            <img src={display} alt="Shop Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        )}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Create Shop</button>
      </form>
    </div>
  );
};

export default Shop;
