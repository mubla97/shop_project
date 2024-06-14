import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Modal, Button, Spinner } from "react-bootstrap";
import BootstrapTable from "fad-react-bootstrap-table-next";
import { MDBRow } from "mdb-react-ui-kit";
import { UserContext } from '../../../Context/UserContext';

const Products = () => {
  const { role, loading } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteShopId, setDeleteShopId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (role !== 'admin') {
      navigate(`/unauthorized`);
      return;
    }

    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          `http://localhost:8080/products`,
          { withCredentials: true }
        );

        if (Array.isArray(productsResponse.data)) {
          setProducts(productsResponse.data);
        } else if (
          productsResponse.data.products &&
          Array.isArray(productsResponse.data.products)
        ) {
          setProducts(productsResponse.data.products);
        } else {
          setProducts([]);
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

  const redirectToCreateProduct = () => {
    navigate(`/products/create`);
  };

  const redirectToEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/shops/${deleteShopId}/products/${deleteProductId}`
      );
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleShowModal = (productId, shopId) => {
    setDeleteProductId(productId);
    setDeleteShopId(shopId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteProductId(null);
    setDeleteShopId(null);
  };

  let columns = [
    { dataField: "id", text: "ID", sort: true },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "description", text: "Description", sort: true },
    { dataField: "price", text: "Price", sort: true },
    { dataField: "quantity", text: "Quantity", sort: true },
    { dataField: "shop_id", text: "Shop ID", sort: true },
    {
      dataField: "Action",
      text: "Action",
      formatter: (cellContent, row) => (
        <div>
          <button
            id={`Edit-${row.id}`}
            aria-label="Edit"
            className="btn btn-success btn-sm"
            onClick={() => redirectToEditProduct(row.id)}
          >
            <BsPencilSquare />
          </button>
          <button
            id={`Delete-${row.id}`}
            aria-label="Delete"
            className="btn btn-danger btn-sm m-2"
            onClick={() => handleShowModal(row.id, row.shop_id)}
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
      <div
        className="mb-4"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h2>Products</h2>

        <button
          type="button"
          className="btn btn-primary btn-lg mt-4 mb-4"
          onClick={redirectToCreateProduct}
          style={{ minWidth: "150px", padding: "8px", margin: "5px" }}
        >
          Create Product
        </button>

        <MDBRow className="justify-content-center align-items-center bg-white">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={Array.isArray(products) ? products : []}
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
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
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

export default Products;
