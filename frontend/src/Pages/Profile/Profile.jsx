import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { BsPencilSquare } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
    const [userData, setUserData] = useState({
        username: null,
        email: null,
        name: null,
        lastname: null,
        phone: null,
        avatar: null
    });
    const [pageVis, setPageVis] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const redirectToEditProfile = () => {
        navigate("/profile/edit");
    };

    const redirectToProfileSettings = () => {
        navigate("/profile/settings");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profile', {
                    withCredentials: true,
                });
                console.log(response.data);
                const userDetails = {
                    username: response.data.username,
                    name: response.data.name,
                    email: response.data.email,
                    lastname: response.data.lastname,
                    phone: response.data.phone,
                    avatar: response.data.avatar
                };
                setUserData(userDetails);
                setPageVis(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setErrorMessage(true);
                localStorage.removeItem('accessToken');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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

    if (!userData.username) {
        return navigate('/login');
    }

    if (pageVis && errorMessage) {
        return (
            <div className="container mx-auto">
                This page will reload in 3 seconds, if your browser does not reload automatically press <a href="/login">here</a>
            </div>
        )
    }

    return (
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol lg="8" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4" className="gradient-custom text-center text-white"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                <MDBCardImage
                                    src={userData.avatar ? `http://localhost:8080/images/avatars/${userData.avatar}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                    alt={userData.avatar ? "Avatar" : "Default Avatar"}
                                    className="my-5"
                                    style={{ width: '80px' }}
                                    fluid
                                />
                                <MDBTypography tag="h5">{userData.name} {userData.lastname}</MDBTypography>
                                <MDBCardText className="text-white">@{userData.username}</MDBCardText>
                                <MDBIcon far icon="edit mb-5" />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Information</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Username</MDBTypography>
                                            <MDBCardText className="text-muted">{userData.username}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Email</MDBTypography>
                                            <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Name</MDBTypography>
                                            <MDBCardText className="text-muted">{userData.name}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                            <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Last Name</MDBTypography>
                                            <MDBCardText className="text-muted">{userData.lastname}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBTypography tag="h6">Settings</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                            <button type="button" className="btn btn-success" onClick={redirectToEditProfile}><BsPencilSquare /> Edit Information</button>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <button type="button" className="btn btn-success" onClick={redirectToProfileSettings}><BsPencilSquare />  Settings</button>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Profile;
