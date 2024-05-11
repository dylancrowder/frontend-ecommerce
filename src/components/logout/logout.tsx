import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';



const Logout: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/logout`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Error fetching data from server');
                }
                if (response.ok) {
                    navigate('/'); // Redirige a la página de inicio si el inicio de sesión es exitoso
                }

            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, []);



    return (
        <Card sx={{ height: "70vh", margin: 5, borderRadius: '8px', backgroundColor: '#f7f7f7' }}>
            loading
        </Card>
    );
};

export default Logout;
