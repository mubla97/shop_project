import React, { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap"; 
import axios from "axios";
import News from "./News"; 
import AllShops from "./AllShops";
import { colors } from "@mui/material";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  } 
  from 'mdb-react-ui-kit';

const Index = () => {
    const [shops, setShops] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función interna para realizar las dos solicitudes axios de forma simultánea
        const fetchData = async () => {
            try {
                const [shopsResponse, newsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/shop/all'),
                    axios.get('http://localhost:8080/shop/news')
                ]);

                setShops(shopsResponse.data); 
                setNews(newsResponse.data); 
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError('Failed to fetch data'); 
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="mt-4" style={{ backgroundColor: 'white' }}>
                <div className="text-center">
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <MDBContainer fluid className='background-radial-gradient overflow-hidden container-full-height'>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {!error && (
                <MDBRow>
                 <MDBCol className='position-relative'>
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <News news={news} /> 
                    <AllShops shops={shops} /> 
                </MDBCol>
                </MDBRow>
            )}
                  

        </MDBContainer>
        
    );
};

export default Index;
