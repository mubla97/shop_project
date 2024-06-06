import { useState, useEffect } from "react";
import axios from "axios";

const Shop = () => {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [job, setJob] = useState();


    const doShop = async (e) => {
        e.preventDefault();

          axios.post('http://localhost:8080/shop', {
            name: name,
            phone: phone,
            address: address,
            job: job,
          }, {
            withCredentials: true,
          })
          .then(response => {
            console.log(response.data);
            window.location = "/";
          })
          .catch(err => {
            console.error(err);
            alert("Error to create shop: " + err.message);
          });
        }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Create Shop</h2>
      <form onSubmit={e => { doShop(e) }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label >Phone:</label>
          <input type="tel" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address:</label>
          <input  type="text" id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Job Type:</label>
          <input type="text" id="job" name="job" value={job} onChange={e => setJob(e.target.value)} required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Create shop</button>
      </form>
    </div>
  );
};

export default Shop;
