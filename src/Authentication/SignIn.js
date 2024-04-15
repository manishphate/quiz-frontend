import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserValidity () {
            try {
                 await axios.get(`${process.env.REACT_APP_BACKEND_URI}/current-user`, {
                    withCredentials: true
                });
                navigate('/');
            } catch (error) {
                
            }
        }
        checkUserValidity ();
    }, [navigate])

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/login`, values, {
                withCredentials: true
            });

            if (response.data.success === true) {
                navigate('/dashboard');
            }

        } catch (error) {
            // console.error("Error:", error);

            if(error.response.status === 404)
            {
                setErrorMessage('Email is not registered.');
            }
            else if(error.response.status === 401){
                setPasswordMessage('Incorrect password.');
            }    
            
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500" />
                                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                        {passwordMessage && <div className="text-red-500">{passwordMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?{' '}
                                    <a href="signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        SignUp
                                    </a>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default SignIn;
