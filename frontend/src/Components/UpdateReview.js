import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import "../App.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';

export default function UpdateReview(){ 
    const { id } = useParams();

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Hello world</h1>
            <h4>review ID: {id}</h4>
        </div>
    )
}