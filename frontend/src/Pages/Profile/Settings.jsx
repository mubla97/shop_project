import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';

const Settings = () => {
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [lastname, setLastname] = useState();
    const [avatar, setAvatar] = useState();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const redirectToPassword = () => {
        navigate("/profile/password");
    };

    const redirectToProfile = () => {
        navigate("/profile");
    };

    const deleteAccount = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:8080/profile/delete', { withCredentials: true })
            .then(() => {
                localStorage.clear();
                window.location = "/";
            }).catch((err) => {
                console.log(err);
            });
    };

    const toggleModal = () => {
        console.log("Modal state toggled:", !showModal);
        setShowModal(!showModal);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/profile', { withCredentials: true })
            .then((response) => {
                const { username, name, lastname, avatar } = response.data;
                setUsername(username);
                setName(name);
                setLastname(lastname);
                setAvatar(avatar);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del perfil:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`settings-container ${showModal ? 'show-modal' : ''}`}>
            <div className="settings-card">
                <div className="settings-card-header">
                    <img
                        src={avatar ? `http://localhost:8080/storage/${avatar}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                        alt={avatar ? "Avatar" : "Default Avatar"}
                        className="my-5"
                        style={{ width: '80px' }}
                        fluid
                    />
                    <h5>{name} {lastname}</h5>
                    <p>@{username}</p>
                </div>
                <div className="settings-card-body">
                    <h6>Settings</h6>
                    <hr />
                    <div className="settings-actions">
                        <button className="btn btn-danger" onClick={redirectToPassword}>
                            <BsPencilSquare /> Change password
                        </button>
                        <button className="btn btn-danger" onClick={toggleModal}>
                            <BsFillTrash3Fill /> Delete account
                        </button>
                    </div>
                    <hr />
                    <button className="btn btn-warning" onClick={redirectToProfile}>
                        Go Back
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div style={{ background: 'white', borderRadius: '8px', width: '600px',  maxWidth: '80%', padding: '20px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1001, display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-header">
                            <h5>Are you sure you want to delete your account?</h5>
                            <button className="close-button" onClick={toggleModal}>×</button>
                        </div>
                        <div className="modal-body">
                            This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-warning" onClick={toggleModal}>Close</button>
                            <button className="btn btn-danger" onClick={deleteAccount}>Delete account</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
