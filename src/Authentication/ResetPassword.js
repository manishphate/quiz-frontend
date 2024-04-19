import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserValidity() {
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_URI}/current-user`, {
                    withCredentials: true
                });
                navigate('/');
            } catch (error) {
                // Handle error or continue
            }
        }
        checkUserValidity();
    }, [navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URI}/reset-password/${id}/${token}`, values, {
                withCredentials: true
            });
            navigate('/home-dashboard');
        } catch (error) {
            
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Reset Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="mt-8 space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        New Password
                                    </label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className={`mt-1 p-2 block w-full rounded-md border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm New Password
                                    </label>
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className={`mt-1 p-2 block w-full rounded-md border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
