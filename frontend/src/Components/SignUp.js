import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';
// import {GoogleLogin} from "react-google-login";
import { GoogleLogin } from '@react-oauth/google';

const clientId = "988334683797-svavkgnvqnolf13ln3lccqi9avokagf6.apps.googleusercontent.com";
export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [navigate, setNavigate] = useState(false);

    const submitLogin = async e => {
        e.preventDefault();

        // validate the user is not in the DB
        if(password == confirmPassword){
            const userSignupDetails = {
                email: email,
                password: password
            }
    
            axios.post("http://localhost:8080/api/login/signUp", userSignupDetails).then((res) => {
                console.log("this is the Signup response"); 
                alert("New user created");   
                setNavigate(true);
            }).catch((err) => {
                alert(err);
                console.log(err);
                console.log("Error with login");
            })
        }
        }

    if (navigate) {
        return <Navigate to="/login" />;
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
                                    setEmail(e.target.value)
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

                            {/* <!-- Password input --> */}
                            <div class="form-outline mb-4">
                                <input type="password" id="form1Example23" class="form-control form-control-lg" onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} required />
                                <label class="form-label" for="form1Example23">Confirm Password</label>
                            </div>

                            {/* <!-- Submit button --> */}
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign Up</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}