import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Profile.css";
import { useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import UpdateProfile from "./UpdateProfile";
import FriendSuggestion from "./FriendSuggestion";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Modal } from "@mui/material";
import { io } from "socket.io-client";
import DisplayReviewsByUser from "./DisplayReviewsByUser";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";


export default function DisplayProfile() {
  // defining variables to take data from the backend
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [proPic, setPropic] = useState("");
  const [gender, setGender] = useState("");
  // const [userId, setUserId] = useState("");
  // console [users, setUsers] = useState([]);


  // Define variables for display follow/ unfollow 
  const [isFollowing, setIsFollowing] = useState(false);
  // const [followeeId, setFolloweeId] = useState("");

  // defining variables for display delete button
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  // defining variable for displaying update form
  const [open, setOpen] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [filename, setFilename] = useState("");

  // get user details from backend
  useEffect(() => {
    // const socket = io("http://localhost:5000");
    // console.log(socket.on("firstEvent", (msg) => {
    //   console.log(msg);
    // })); 

    // console.log("Session:  " + sessionStorage.getItem("accessToken"))
    //         console.log("userId:  " + props.userId);

    console.log("ID: " + id);

    axios.get(`http://localhost:8080/api/user/getUserById/${id}`).then((res) => {
      console.log(res.data);
      setName(res.data.displayName);
      setPropic(res.data.proPic);
      // setFolloweeId( {followeeId: userId});
      // console.log(followeeId);

    }).catch((err) => {
      alert(err.message);
    })
  }, [id]);

  const handleClick = () => {

    axios
      .put(`http://localhost:8080/api/user/${sessionStorage.getItem("userId")}/follow/${id}`)
      .then((res) => {
        console.log("user" + res.data);
        setIsFollowing(true);
        console.log("session" + sessionStorage.getItem("userId"));
        alert("request sent")
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const btnClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  // const handleUpdateFormOpen = () => {
  //   setShowUpdateForm(true);
  // };

  // const handleUpdateFormClose = () => {
  //   setShowUpdateForm(false);
  // };

  const handleDeleteUser = async () => {
    try {
      const { data: res } = await axios.delete(
        `http://localhost:8080/api/user/delete/${id}`
      );
      console.log(res);
      window.location.replace("/");
      // Redirect the user to the homepage or a different page after deletion
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="profile">
      <div className="images">
        {/* <img
          className="coverImage"
          src="https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        /> */}
        <img
          className="userImage"
          src={proPic}
          alt=""
        />
      </div>

      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            {/* <a
              className="friends"
              href="https://www.youtube.com/watch?v=FweHcYHkt9A&t=6979s"
            >
              <PeopleIcon />
              Friends
            </a> */}
            <button className="friends" onClick={() => {
              window.location.replace(`/profile/${id}/friends`);
            }}>Friends <PeopleIcon /></button>
            {/* <input id="filePicker" type="file" onChange={changeProfilePicture} /> */}
          </div>

          <div className="center">
            <span className="display_username">{name}</span>
          </div>
          <div className="right">
            {/* <button className="btnProfile" onClick={()=>{
               window.location.replace(`/profile/${id}/update`)
            }}>Update</button> */}

            {/* <button className="btnProfile" onClick={handleUpdateFormOpen}>
              Update
            </button> */}

            {/* { */}
            {
              id == sessionStorage.getItem("userId") && (
              <button className="btnProfile" onClick={() => setOpen(true)}>
              Update
            </button>
              )
            }

            <Modal open={open} onClose={() => setOpen(false)}>
              <div className="updateProf">
                <UpdateProfile />
              </div>
            </Modal>
            {/* } */}

            {
              id != sessionStorage.getItem("userId") && (
                <button className="btnProfile" onClick={handleClick}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
              )
            }
            
            <IconButton className="Iconbtn" onClick={btnClick}>
              <MoreHorizIcon />
              <Menu anchorEl={anchorEl} open={showMenu} onClose={handleClose}>
                <MenuItem onClick={() => setShowDeleteConfirmation(true)}>
                  Delete
                </MenuItem>
              </Menu>
            </IconButton>

            <Modal
              open={showDeleteConfirmation}
              onClose={() => setShowDeleteConfirmation(false)}
            >
              <div className="deleteConfirmation">
                <h3>Are you sure you want to delete this user?</h3>
                <button className="btnDelete" onClick={handleDeleteUser}>
                  Delete
                </button>
                <button
                  className="btnCancel"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="bottom_left">
          {/* <CreatePost /> */}
          <DisplayReviewsByUser userId={id} />
        </div>

        {/* <div className="bottom_right">
          <FriendSuggestion />
        </div> */}
      </div>
    </div>
  );
}
