import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/home-dashboard')
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
