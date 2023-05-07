import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';
// import {GoogleLogin} from "react-google-login";
import { GoogleLogin } from '@react-oauth/google';

const clientId = "988334683797-svavkgnvqnolf13ln3lccqi9avokagf6.apps.googleusercontent.com";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [navigate, setNavigate] = useState(false);

    const submitLogin = async e => {
        e.preventDefault();

        const userLoginDetails = {
            username: username,
            password: password
        }

        axios.post("http://localhost:8080/api/login/loginUser", userLoginDetails).then((res) => {
            console.log("this is the login response");
            console.log(res.data.accessTOken);
            sessionStorage.setItem("accessToken", res.data.accessTOken);
            sessionStorage.setItem("refreshToken", res.data.refreshToken);
            sessionStorage.setItem("userId", res.data.userId);


            // console.log("SEssion access: " + sessionStorage.getItem("accessToken"));
            setNavigate(true);
        }).catch((err) => {
            alert(err);
            console.log(err);
            console.log("Error with login");
        })
    }
    if (navigate) {
        return <Navigate to="/" />;
    }



    return (
        <section class="vh-100">
            <div class="container py-5 h-100">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="img-fluid" alt="Phone image" />
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={submitLogin}>
                            {/* <!-- Email input --> */}
                            <div class="form-outline mb-4">
                                <input type="email" id="form1Example13" class="form-control form-control-lg" onChange={(e) => {
                                    setUsername(e.target.value.split("@")[0])
                                }} required />
                                <label class="form-label" for="form1Example13">Email address</label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div class="form-outline mb-4">
                                <input type="password" id="form1Example23" class="form-control form-control-lg" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} required />
                                <label class="form-label" for="form1Example23">Password</label>
                            </div>

                            <div class="d-flex justify-content-around align-items-center mb-4">
                                {/* <!-- Checkbox --> */}
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                    <label class="form-check-label" for="form1Example3"> Remember me </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            {/* <!-- Submit button --> */}
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>

                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                        </form>
                        <button className="btn btn-primary socialBtns">Log In With Facebook</button>
                        {/* <button className="btn btn-primary socialBtns">Log In With Google</button> */}
                        {/* <GoogleLogin
                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        /> */}
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log("Credential: " + credentialResponse.credential);
                                sessionStorage.setItem("accessToken", credentialResponse.credential);
                                setNavigate(true);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <button className="btn btn-primary" onClick={() => {
                            window.location.replace(`/signup`);
                        }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </section>
    )
}