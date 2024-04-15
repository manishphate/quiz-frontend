import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_URI}/current-user`, {
                    withCredentials: true
                });
                navigate('/dashboard');
            } catch (error) {
                console.log(error);
                // If the error is due to JWT token expiration or access token missing, redirect to continue UI
                if (error.response.status === 401) {
                    navigate('/continue'); // Redirect to your continue UI route
                } else {
                    navigate('/signIn')
                }
            }
        }
        fetchData();
    }, [navigate]);

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                    <div className="mt-4 text-blue-500">Loading...</div>
                </div>
            </div>
        </>
    )
}

export default Auth