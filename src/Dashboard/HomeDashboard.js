import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './HomeDashboard.css'
import { useNavigate } from 'react-router-dom';
import SignIn from '../Authentication/SignIn';
import SignUp from '../Authentication/SignUp';


const HomeDashboard = () => {
    const navigate = useNavigate();
    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const [isSignUpVisible, setIsSignUpVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isNameVisible, setIsNameVisible] = useState(true);



    useEffect(() => {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
        }, {});

        const { accessToken, refreshToken } = cookies;
        async function fetchData() {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URI}/current-user`, { accessToken, refreshToken }, {
                    withCredentials: true
                });
                navigate('/dashboard');
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/continue');
                } else {
                    navigate('/home-dashboard')
                }
            }
        }
        fetchData();
    }, [navigate]);

    const handleSignIn = () => {
        // navigate('/signIn')
        setIsButtonVisible(false);
        setIsNameVisible(false)
        setIsSignUpVisible(false);
        setIsSignInVisible(true);
    }

    const handleSignUp = () => {
        setIsNameVisible(false);
        setIsButtonVisible(false);
        setIsSignInVisible(false);
        setIsSignUpVisible(true);
    }

    return (
        <>
            <div className="container">
                <div className='home-header'>
                    {isNameVisible && (
                        <div className='header-content'>
                            <h1 className='quiz-name'>Quiz</h1>
                        </div>
                    )}
                    {isSignInVisible && (
                        <div className="sign-in-container">
                            <SignIn />
                            <p className="text-center text-sm text-black">
                                Not a member?{' '}
                                <a className="font-semibold leading-6 text-navy-600 hover:text-navy-500" onClick={handleSignUp}>
                                    SignUp
                                </a>
                            </p>
                        </div>
                    )}

                    {isSignUpVisible && (
                        <div className="sign-in-container">
                            <SignUp />
                            <p className="text-center text-sm text-black">
                                Already have an account?{' '}
                                <a className="font-semibold leading-6 text-navy-600 hover:text-navy-500" onClick={handleSignIn}>
                                    Sign In
                                </a>
                            </p>
                        </div>
                    )}

                    {isButtonVisible && (
                        <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
                    )}
                </div>
                <footer className='home-footer'>
                    <div className="background">
                        <svg
                            className='home-svg'
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="100%"
                            height="100%"
                            viewBox="0 0 1600 900"
                        >
                            <defs>
                                <path
                                    id="wave"
                                    fill="rgba(105, 27, 252, 0.6)"
                                    d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
          s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                                />
                            </defs>
                            <g>
                                <use xlinkHref="#wave" opacity=".4">
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="translate"
                                        dur="8s"
                                        calcMode="spline"
                                        values="270 230; -334 180; 270 230"
                                        keyTimes="0; .5; 1"
                                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                        repeatCount="indefinite"
                                    />
                                </use>
                                <use xlinkHref="#wave" opacity=".6">
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="translate"
                                        dur="6s"
                                        calcMode="spline"
                                        values="-270 230;243 220;-270 230"
                                        keyTimes="0; .6; 1"
                                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                        repeatCount="indefinite"
                                    />
                                </use>
                                <use xlinkHref="#wave" opacty=".9">
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="translate"
                                        dur="4s"
                                        calcMode="spline"
                                        values="0 230;-140 200;0 230"
                                        keyTimes="0; .4; 1"
                                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                        repeatCount="indefinite"
                                    />
                                </use>
                            </g>
                        </svg>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomeDashboard;