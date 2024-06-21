import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';
import { Spinner } from "react-bootstrap"; 

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const redirectToProfile = () => {
        navigate("/profile");
    };

    const redirectToAvatar = () => {
        navigate("/profile/avatar");
    };

    const ChangeProfile = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/profile/edit', {
            username: username,
            email: email,
            name: name,
            lastname: lastname,
            phone: phone
        }, {
            withCredentials: true,
        })
        .then(() => {
            navigate("/profile");
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again later.');
        });
    }

    useEffect(() => {
        // Realizar la solicitud para obtener los datos del perfil del usuario
        axios.get('http://localhost:8080/profile', {
            withCredentials: true,
        })
            .then((response) => {
                const { username, email, name, lastname, phone, avatar } = response.data;
                setUsername(username);
                setEmail(email);
                setName(name);
                setLastname(lastname);
                setPhone(phone);
                setAvatar(avatar);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del perfil:', error);
                setError('No se pudieron cargar los datos del perfil. Inténtalo de nuevo más tarde.');
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    // Mostramos el spinner mientras se cargan los datos
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

    // Mostramos el mensaje de error si ocurre algún problema en la carga de datos
    if (error) {
        return (
            <div className="container mt-4">
                <p>{error}</p>
            </div>
        );
    }

    // Mostramos el formulario de edición una vez que los datos están cargados
    return (
        <>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage
                                        src={avatar ? `http://localhost:8080/images/avatars/${avatar}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                        alt={avatar ? "Avatar" : "Default Avatar"}
                                        className="my-5"
                                        style={{ width: '80px' }}
                                        fluid
                                    />
                                    <MDBTypography tag="h5">
                                        <button type="button" className="btn btn-warning" onClick={redirectToAvatar}> Change avatar</button>
                                    </MDBTypography>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Edit Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Username</MDBTypography>
                                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username..." />
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email..." />
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Name</MDBTypography>
                                                <input value={name} onChange={e => setName(e.target.value)} placeholder="name..." />
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="phone..." />
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Last Name</MDBTypography>
                                                <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder="lastname..." />
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6"></MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <button className="btn btn-success" onClick={ChangeProfile} type="submit"> Save</button>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <button className="btn btn-warning" onClick={redirectToProfile}>Go Back</button>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default EditProfile;
