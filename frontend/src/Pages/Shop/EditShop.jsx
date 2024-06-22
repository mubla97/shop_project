import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";

const EditShop = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(null);
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

  const fetchData = async () => {
    try {
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

  useEffect(() => {
    fetchData();
  }, [shopId]);

  const updateShop = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('community', community);
      formData.append('postal_code', postal_code);
      formData.append('job', job);
      if (image) {
        formData.append('shopImage', image); // Append the image file if selected
      }

      const response = await axios.post(`http://localhost:8080/shop/${shopId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      console.log(response.data);
      navigate("/shop");
    } catch (err) {
      console.error(err);
      setError("Error updating shop: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteShop = async () => {
    try {
      await axios.delete(`http://localhost:8080/shop/${shopId}`, {
        withCredentials: true,
      });
      navigate("/shop");
    } catch (err) {
      console.error(err);
      setError("Error deleting shop: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

  const openFileInput = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
        <h2>Edit Shop</h2>
        <form onSubmit={updateShop}>
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
                <option value="Laundry">Laundry</option>
                <option value="Photography Studio">Photography Studio</option>
                <option value="Travel Agency">Travel Agency</option>
                <option value="Stationery Store">Stationery Store</option>
                <option value="Video Store">Video Store</option>
                <option value="Music Store">Music Store</option>
               </select>
             </div>
             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label htmlFor="image">Shop Image</label>
              <div>
                <input
                  type="file"
                  id="imageInput"
                  name="image"
                  accept="image/*"
                  onChange={changeHandler}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={openFileInput}
                  className="btn btn-primary"
                  style={{ minWidth: '150px', padding: '8px', margin: '5px' }}
                >
                  Add Image
                </button>
              </div>
              {display && (
                <div style={{ marginTop: '10px' }}>
                  <img src={display} alt="Shop" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
              )}
            </div>
             <button type="submit" className="btn btn-success btn-lg" style={{ minWidth: '150px', padding: '8px', margin: '5px' }}>
               Save Changes
             </button>
           </form>
         </div>

         <div
           style={{
             maxWidth: '800px',
             margin: '0 auto',
             padding: '20px',
             border: '1px solid #ccc',
             borderRadius: '10px',
             marginTop: '30px',
           }}
           className="mb-4"
         >
           <h2>Settings</h2>
           <button
             type="button"
             className="btn btn-primary btn-lg"
             onClick={redirectToProducts}
             style={{ minWidth: '150px', padding: '8px', margin: '5px' }}
           >
             Products
           </button>
           <button
             type="button"
             className="btn btn-danger btn-lg"
             onClick={() => setShowModal(true)}
             style={{ minWidth: '150px', padding: '8px', margin: '5px' }}
           >
             Delete Shop
           </button>
         </div>

         <Modal show={showModal} onHide={handleCloseModal} aria-labelledby="delete-modal-title">
           <Modal.Header closeButton>
             <Modal.Title id="delete-modal-title">Delete Shop</Modal.Title>
           </Modal.Header>
           <Modal.Body>Are you sure you want to delete this shop?</Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleCloseModal}>
               Cancel
             </Button>
             <Button variant="danger" onClick={deleteShop}>
               Delete
             </Button>
           </Modal.Footer>
         </Modal>
       </>
     );
   };

   export default EditShop;

