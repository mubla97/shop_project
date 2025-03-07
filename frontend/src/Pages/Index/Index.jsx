import React, { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap"; 
import axios from "axios";
import News from "./News"; 
import AllShops from "./AllShops";
import { colors } from "@mui/material";

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
        <div className="container">
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {!error && (
                <>
                    <News news={news} /> 
                    <AllShops shops={shops} /> 
                </>
            )}
        </div>
    );
};

export default Index;
