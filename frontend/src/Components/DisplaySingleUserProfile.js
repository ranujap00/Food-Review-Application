import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Profile.css";
import { useParams } from "react-router-dom";

export default function DisplaySingleUserProfile(){
    const { username } = useParams();

    let[name, setName] = useState("");
    let[id, setId] = useState("");

    useEffect(() => {
        const getUserByUsername = async () => {
            const { data: res } = await axios.get(`http://localhost:8080/api/login/getUserDetails/${username}`);
            console.log(res);
            setName(res.username);
            setId(res.id);
        }
        getUserByUsername();
    }, []);

    return(
        <div>
            <br/>
            <h1>Display single user</h1>
            <h1>name {name}</h1>
            <h1>ID {id}</h1>
        </div>
    )
}