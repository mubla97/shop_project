import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Modal, Button, Spinner } from "react-bootstrap";
import BootstrapTable from "fad-react-bootstrap-table-next";
import { MDBRow } from "mdb-react-ui-kit";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const navigate = useNavigate();

  const redirectToCreateUser = () => {
    navigate(`/users/create`);
  };

  const redirectToEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          `http://localhost:8080/users`,
          {
            withCredentials: true,
          }
        );

        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
        } else if (
          usersResponse.data.users &&
          Array.isArray(usersResponse.data.users)
        ) {
          setUsers(usersResponse.data.users);
        } else {
          setUsers([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/users/${deleteUserId}`
      );
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleShowModal = (userId) => {
    setDeleteUserId(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  let columns = [
    { dataField: "id", text: "ID", sort: true },
    { dataField: "username", text: "Username", sort: true },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "lastname", text: "Lastname", sort: true },
    { dataField: "email", text: "Email", sort: true },
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
              onClick={() => redirectToEditUser(row.id)}
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
      <div className="mb-4"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "30px",
          margin
        }}
      >
        <h2>Users</h2>

        <button
          type="button"
          className="btn btn-primary btn-lg mt-4 mb-4"
          onClick={redirectToCreateUser}
          style={{ minWidth: "150px", padding: "8px", margin: "5px" }}
        >
          Create User
        </button>

        <MDBRow
          className="justify-content-center align-items-center bg-white"
        >
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={Array.isArray(users) ? users : []}
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
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default Users;
