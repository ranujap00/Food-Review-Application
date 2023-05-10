import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../CSS/UpdateProfile.css";
import { Button, Modal } from '@mui/material';
import Model from 'react-modal';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";

export default function UpdateProfile() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    // const [proPic, setProPic] = useState("");
    const [filename, setFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/getUserById/${id}`).then((res) => {
            console.log(res.data);
            setName(res.data.username);
            // console.log(setName);
            setEmail(res.data.email);
            setGender(res.data.gender);
            // setProPic(res.data.proPic);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    function updateData(e) {
        e.preventDefault();

        // const newUser = {
        //     username,
        //     email,
        //     gender,
        //     // proPic :imageUrl
        // }
        axios.put(`http://localhost:8080/api/user/updateUser/${id}`).then(() => {
            alert("User details updated!");
            // window.location.replace("http://localhost:3000/");
            
        }).catch((err) => {
            alert(err);
        })
    }

    const changeProfilePicture = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        uploadFiles(file);
        console.log("DP: " + filename);
    
      };
    
      const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `profileImages/${sessionStorage.getItem("userId")}/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
            "state_changed",
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File: ", downloadURL);
                    console.log(typeof downloadURL);
                    setFilename(downloadURL);
                });
            }
        );
    };
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const { data: res } = await axios.put(
    //         `http://localhost:8081/api/user/updateUser/${id}`,
    //         { name, email, gender, proPic }
    //       );
    //       console.log(res);
    //       alert("Profile updated successfully!");
    //     } catch (err) {
    //       console.log(err);
    //       alert("Error updating profile.");
    //     }
    //   };

    return (
          <div className='page'>
            <form className='UpdateForm' onSubmit={updateData}>
                <div className='mb-3'>
                    <label for="username" className='form-label'>Name</label>
                    <input type='text' className='form-control' id='username' value={username} onChange={(e) =>{
                        setName(e.target.value)
                    }}/>
                </div>

                <div className='mb-3'>
                    <label for="gender" className='form-label'>Gender</label>
                    {/* <input type='text' className='form-control' id='gender' value={gender} onChange={(e) =>{
                        setGender(e.target.value)
                    }}/> */}
                    <select id="gender" class="form-control" value={gender} onChange={(e) => {
                setGender(e.target.value);
              }}>
                <option selected>Male</option>
                <option>Female</option>
              </select>
                </div>

                {/* <div className='mb-3'>
                    <label for="proPic" className='form-label'>Profile Picture</label>
                    <input id="filePicker" type="file" onChange={changeProfilePicture}/> */}
                    {/* <input type='text' className='form-control' id='proPic' value={proPic} onChange={(e) =>{
                        setProPic(e.target.value)
                    }}/> */}
                {/* </div> */}

                <button type="submit" class="btn btn-success">Update <i class="fa fa-pencil"></i></button>

            </form>
          </div> 
    );
}
