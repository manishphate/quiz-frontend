import React from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const ContinueUI = () => {

    const navigate = useNavigate();

    const handleContinue =async() => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/refresh-token`, null,{
                withCredentials: true
            });
            const { data } = await response.data;

            document.cookie = `accessToken=${data.accessToken}; Path=/; SameSite=None; Secure`;
            document.cookie = `refreshToken=${data.refreshToken}; Path=/; SameSite=None; Secure`;
            
            navigate('/dashboard');

        } catch (error) {
            navigate('/signIn');
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-semibold mb-8 text-indigo-800">Welcome back</h1>
                <div className="flex space-x-4">
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleContinue}
                    >
                    Continue
                </button>
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
                Try another account?{' '}
                <a href="/signIn" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign In
                </a>
            </p>
        </div >
        </>
    );
};

export default ContinueUI;
