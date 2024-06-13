import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Modal, Button, Spinner } from "react-bootstrap";
import BootstrapTable from "fad-react-bootstrap-table-next";
import { MDBRow } from "mdb-react-ui-kit";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();
  const { shopId } = useParams();

  const redirectToCreateProducts = () => {
    navigate(`/shop/${shopId}/products/create`);
  };

  const redirectToEditProduct = (productId) => {
    navigate(`/shop/${shopId}/products/${productId}/edit`);
  };

  const redirectToShop = () => {
    navigate(`/shop/${shopId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          `http://localhost:8080/shop/${shopId}/products`,
          {
            withCredentials: true,
          }
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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/shop/${shopId}/products/${deleteProductId}`
      );
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleShowModal = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteProductId(null);
  };

  let columns = [
    { dataField: "id", text: "ID", sort: true },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "description", text: "Description", sort: true },
    { dataField: "price", text: "Price", sort: true },
    { dataField: "quantity", text: "Stock", sort: true },
    { dataField: "shop_id", text: "Shop ID", sort: true },
    {
      dataField: "Action",
      text: "Action",
      formatter: (cellContent, row) => {
        return (
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
              onClick={() => handleShowModal(row.id)}
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        );
      },
    },
  ];

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
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h2>Products</h2>
        <MDBRow
          className="justify-content-center align-items-center bg-white"
        >
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

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h2>Settings</h2>
        <button
          type="button"
          className="btn btn-warning btn-lg"
          onClick={redirectToShop}
          style={{ minWidth: "150px", padding: "8px", margin: "5px" }}
        >
          Shop
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={redirectToCreateProducts}
          style={{ minWidth: "150px", padding: "8px", margin: "5px" }}
        >
          Create Product
        </button>
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
