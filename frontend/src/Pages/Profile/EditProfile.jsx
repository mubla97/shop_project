import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';

const EditProfile = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [lastname, setLastname] = useState();
    const [phone, setPhone] = useState();

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const redirectToProfile = () => {
        navigate("/profile");
    };
    const redirectToAvatar = () => {
        navigate("/profile/avatar");
    };

    const Changeprofile = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/profile/edit', {
            username: username,
            email: email,
            name: name,
            lastname: lastname,
            phone: phone
        } ,
            {
                withCredentials: true,
            }
        )
        
    }

    useEffect(() => {
        // Realizar la solicitud para obtener los datos del perfil del usuario
        axios.get('http://localhost:8080/profile', {
            withCredentials: true,
        })
            .then((response) => {
                const { username, email, name, lastname, phone } = response.data;
                setUsername(username);
                setEmail(email);
                setName(name);
                setLastname(lastname);
                setPhone(phone);
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
        <>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    <MDBTypography tag="h5"><button type="button" className="btn btn-warning" onClick={redirectToAvatar}> Change avatar</button></MDBTypography>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6"> Edit Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Username</MDBTypography>
                                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username..."></input>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email..."></input>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Name</MDBTypography>
                                                <input value={name} onChange={e => setName(e.target.value)} placeholder="name..."></input>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="telefone..."></input>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Last Name</MDBTypography>
                                                <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder="lastname..."></input>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6"></MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <button className="btn btn-success" onClick={e => { Changeprofile(e) }} type="submit"> Save</button>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <button className="btn btn-warning" onClick={redirectToProfile}>Go Back </button>
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