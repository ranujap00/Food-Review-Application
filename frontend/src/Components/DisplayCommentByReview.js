import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/comment.css";
import Model from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "@mui/material";

export default function DisplayCommentByReview(props) {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState("");
    const [visibility, setVisibility] = useState(false);

    const [commentId, setCommentId] = useState("");
    const [commentDescription, setCommentDescription] = useState("");

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const getComment = async () => {
            axios.get(`http://localhost:8080/api/comment/getCommentByReviewId/${props.reviewId}`).then((res) => {
                console.log(res.data);
                setComments(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        const getUsers = async () => {
            axios.get(`http://localhost:8080/api/users/all`).then((res) => {
                console.log(res.data);
                setUsers(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }

        getComment();
        getUsers();
    }, []);

    const deleteComment = (id) => {
        console.log("Comment ID: " + id);
        axios.delete(`http://localhost:8080/api/comment/delete/${id}`).then((res) => {
            console.log(res.data);
            setShowDeleteConfirmation(false);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateComment = (id, description) => {
        setCommentId(id);
        setCommentDescription(description);
        setVisibility(true);
    }

    function updateCommentForm() {
        const updatedComment = {
            review_Id: props.reviewId,
            description: commentDescription,
            user_Id: sessionStorage.getItem("userId")
        }

        axios.put(`http://localhost:8080/api/comment/update/${commentId}`, updatedComment).then((res) => {
            console.log(res.data);
            alert("Comment Updated");

        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <div>
            <div>
                {comments.map((comment) => (
                    <div className="parent">
                            
                        <div className="comment">
                            {users.map((user) => {

                                if (user.id == comment.user_Id) {
                                    return <p className="username">{user.username} ---- <span className="comment_date">{comment.date}</span></p>;
                                }
                            })}
                            <p className="comment_date"></p>
                            <p className="comment_description">{comment.description}</p>
                        </div>  
                        <div className="commentBtns">
                            {
                                comment.user_Id == sessionStorage.getItem("userId") && (
                                    <button className="btn btn-primary btn-sm" onClick={() => updateComment(comment.comment_Id, comment.description)}>Update</button>
                                )
                            }
                            {
                                comment.user_Id != sessionStorage.getItem("userId") && (
                                    <button className="btn btn-primary btn-sm" disabled>Update</button>
                                )
                            }
                            {
                                props.userId == sessionStorage.getItem("userId") && (
                                    <button className="btn btn-danger btn-sm deleteBtn" onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
                                )
                            }

                        </div>

                        <Modal

                                open={showDeleteConfirmation}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& .MuiPaper-root": {
                                        backgroundColor: "white",
                                        border: "2px solid #000",
                                        boxShadow: 24,
                                        p: 4,
                                    },
                                    "& .MuiBackdrop-root": {
                                        backdropFilter: "blur(2px)",
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    },
                                }}
                                onClose={() => setShowDeleteConfirmation(false)}
                            >
                                <div className="deleteConfirmation">
                                    <h3>Are you sure you want to delete this Comment?</h3>
                                    <button className="btnDelete" onClick={() => deleteComment(comment.comment_Id)}>
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
                        <br />
                        <br />
                        <br />
                    </div>

                ))}

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
                            width: "500px",
                            height: "300px",
                            background: "white"
                        }
                    }}>

                    <CloseIcon
                        onClick={() => setVisibility(false)}
                        className="close-btn"
                        color="error" />
                    <h3>Update Comment</h3>


                    <form onSubmit={updateCommentForm}>
                        <div class="mb-3">
                            <label for="commentDesc" class="form-label">Description</label>
                            <textarea id="commentDesc" rows="4" cols="50" onChange={(e) => {
                                setCommentDescription(e.target.value)
                            }}>
                                {commentDescription}
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-success">Update</button>
                    </form>
                </Model>
            </div>
        </div>
    )
}