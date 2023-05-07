import React, { useEffect, useState } from "react";
import '../App.css'
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import Model from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import CreatePost from './CreatePost'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function NavBar() {
    let [username, setUsername] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //     displayNotifications();

    // }, [])

    function logout() {
        window.location.replace("/login");

        let accessTok = sessionStorage.getItem("accessToken");
        let refreshTok = sessionStorage.getItem("refreshToken");
        let userId = sessionStorage.getItem("userId");

        const TokenDTO = {
            userId: userId,
            accessTOken: accessTok,
            refreshToken: refreshTok
        }

        axios.post("http://localhost:8080/api/login/logOut", TokenDTO).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    function logoutAll() {
        // window.location.replace("/login");

        let accessTok = sessionStorage.getItem("accessToken");
        let refreshTok = sessionStorage.getItem("refreshToken");
        let userId = sessionStorage.getItem("userId");

        const TokenDTO = {
            userId: userId,
            accessTOken: accessTok,
            refreshToken: refreshTok
        }

        axios.post("http://localhost:8080/api/login/logoutAll", TokenDTO).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    function visitProfile() {
        console.log("USER: " + sessionStorage.getItem("userId"));
        window.location.replace(`/UserProfile/${sessionStorage.getItem("userId")}`);
    }

    function displaySearchedProfile() {
        axios.get(`http://localhost:8080/api/user/getUserByUsername/${username}`).then((res) => {
            // console.log(res.data);
            window.location.replace(`/UserProfile/${res.data.id}`);

        }).catch((err) => {
            alert(err.message);
        })
    }

    function displayNotifications() {
        axios.get(`http://localhost:8080/api/notification/getNotification/${sessionStorage.getItem("userId")}`).then((res) => {
            console.log(res.data);
            setNotifications(res.data);

        }).catch((err) => {
            alert(err.message);
        })
    }

    function deleteNotification(id){
        console.log("NOT ID: " + id);
        axios.delete(`http://localhost:8080/api/notification/deleteNotification/${id}`).then((res) => {
            console.log(res.data);

        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <nav className="navBar">
            <div class="container-fluid">
                <div className="holder">
                    <div className="dropDownAndName">
                        <a href="/"><h4>Foodies</h4></a>

                    </div>


                    <div className="searchContainer">
                        <form>
                            <input type="text" placeholder="search" className="searchBar" value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                            <IconButton aria-label="search" onClick={displaySearchedProfile}>
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>
                    <div className="navIconContainer">
                        <button className="addPostBtn btn btn-primary" onClick={() => {
                            setVisibility(true);
                        }}>Add post</button>

                        <div className="iconBtn">
                            {/* <IconButton onClick={() => {
                                // alert('Notification button');
                                
                            }}>
                                <NotificationsNoneIcon />
                            </IconButton> */}

                            <Dropdown onClick={displayNotifications}>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <NotificationsNoneIcon />
                                </Dropdown.Toggle>

                                <Dropdown.Menu  style={{ width: "500px" }}>
                                    {
                                        notifications.map((notify)=>(
                                            <Dropdown.Item >{notify.content} <DeleteOutlineOutlinedIcon color="error" onClick={() => deleteNotification(notify.notification_Id)} /></Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="iconBtn">
                            <IconButton onClick={() => {
                                alert('follow requests button');

                            }}>
                                <PersonAddAltIcon />
                            </IconButton>
                        </div>

                        {/* <div className="iconBtn">
                            <IconButton onClick={() => {
                                alert('favorites button');
                                // Implement on click code
                            }}>
                                <StarBorderIcon />
                            </IconButton>
                        </div>

                        <div className="iconBtn">
                            <IconButton onClick={() => {
                                alert('settings button');
                                // Implement on click code
                            }}>
                                <SettingsIcon />
                            </IconButton>
                        </div> */}


                        {/* <div className="iconBtn">
                            <IconButton onClick={() => {
                                window.location.replace(`/`);
                            }}>
                                <AccountCircleIcon />
                            </IconButton>
                        </div> */}
                        <div className="iconBtn">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <AccountCircleIcon />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={visitProfile}>View Profile</Dropdown.Item>

                                    <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>

                                    <Dropdown.Item onClick={logoutAll}>LogOut All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </div>

                <Model
                    isOpen={visibility}
                    onRequestClose={() => setVisibility(false)}
                    style={{
                        overlay: {
                            background: "grey",
                            opacity: 0.97
                        },
                        content: {
                            top: '20%',
                            left: '30%',
                            width: "600px",
                            height: "600px"
                        }
                    }}>

                    <CloseIcon
                        onClick={() => setVisibility(false)}
                        className="close-btn"
                        color="error" />
                    <h3>Post Review</h3>

                    <CreatePost />

                </Model>

            </div>
        </nav>

    )
}