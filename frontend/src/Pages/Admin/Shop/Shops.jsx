import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Modal, Button, Spinner } from "react-bootstrap";
import BootstrapTable from "fad-react-bootstrap-table-next";
import { MDBRow } from "mdb-react-ui-kit";
import { UserContext } from '../../../Context/UserContext';

const Shops = () => {
  const { role, loading } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteShopId, setDeleteShopId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Role:', role);
    console.log('Loading:', loading);

    if (loading) {
      return;
    }

    if (role !== 'admin') {
      navigate(`/unauthorized`);
      return;
    }

    const fetchData = async () => {
      try {
        const shopsResponse = await axios.get(
          `http://localhost:8080/shops`,
          { withCredentials: true }
        );

        if (Array.isArray(shopsResponse.data)) {
          setShops(shopsResponse.data);
        } else if (
          shopsResponse.data.shops &&
          Array.isArray(shopsResponse.data.shops)
        ) {
          setShops(shopsResponse.data.shops);
        } else {
          setShops([]);
        }

        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoadingData(false);
      }
    };

    fetchData();
  }, [role, loading, navigate]);

  const redirectToCreateShop = () => {
    navigate(`/shops/create`);
  };

  const redirectToEditShop = (shopId) => {
    navigate(`/shops/${shopId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/shops/${deleteShopId}`
      );
      setShops(shops.filter((shop) => shop.id !== deleteShopId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting shop:", err);
    }
  };

  const handleShowModal = (shopId) => {
    setDeleteShopId(shopId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteShopId(null);
  };

  let columns = [
    { dataField: "id", text: "ID", sort: true },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "community", text: "Community", sort: true },
    { dataField: "phone", text: "Phone", sort: true },
    { dataField: "user_id", text: "User ID", sort: true },
    {
      dataField: "Action",
      text: "Action",
      formatter: (cellContent, row) => (
        <div>
          <button
            id={`Edit-${row.id}`}
            aria-label="Edit"
            className="btn btn-success btn-sm"
            onClick={() => redirectToEditShop(row.id)}
          >
            <BsPencilSquare />
          </button>
          <button
            id={`Delete-${row.id}`}
            aria-label="Delete"
            className="btn btn-danger btn-sm m-2"
            onClick={() => handleShowModal(row.id)}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      ),
    },
  ];

  // Consolidar el estado de carga
  if (loading || loadingData) {
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
      <div className="mb-4"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h2>Shops</h2>

        <button
          type="button"
          className="btn btn-primary btn-lg mt-4 mb-4"
          onClick={redirectToCreateShop}
          style={{ minWidth: "150px", padding: "8px", margin: "5px" }}
        >
          Create Shop
        </button>

        <MDBRow className="justify-content-center align-items-center bg-white">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={Array.isArray(shops) ? shops : []}
            columns={columns}
            striped
            hover
            condensed
          />
        </MDBRow>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this shop?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Shops;
