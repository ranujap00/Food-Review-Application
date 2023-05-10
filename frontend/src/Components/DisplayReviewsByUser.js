import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/displayReviewsByUser.css";
import { Rating } from 'react-simple-star-rating';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Model from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";



export default function DisplayReviewsByUser(props) {

    const [reviews, setReviews] = useState([]);
    const [visibility, setVisibility] = useState(false);
    let [reviewId, setReviewId] = useState(34);
    const [imagesArr, setImages] = useState([]);

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [location, setLocation] = useState("");
    let [rating, setRating] = useState("");

    

    useEffect(() => {
        function getAllReviewsByUser() {
            console.log("Session:  " + sessionStorage.getItem("accessToken"))
            console.log("userId:  " + props.userId);
            // { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} }
            axios.get(`http://localhost:8080/api/reviews/getAllReviewsByUserId/${props.userId}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} }).then((res) => {
                console.log(res.data);
                setReviews(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        getAllReviewsByUser();

    }, [])

    const deleteReview = async (id) => {
        // confirm("ME");
        console.log("ID: " + id);
        const { data: res } = await axios.get(`http://localhost:8080/api/reviews/getReviewById/${id}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} });
        
        setImages(res.images);
        console.log("IMAGES: " + res.images); 

        // for (let img in imagesArr) {
        //     console.log(imagesArr[img]);
        //     deleteFromFirebase(imagesArr[img]);
        //     console.log("Image deleted")
        // }

        console.log("Review ID: " + id);
        axios.delete(`http://localhost:8080/api/reviews/delete/${id}`).then((res) => {
            console.log(res.data);
            alert("Review deleted");
        }).catch((err) => {
            alert(err.message);
        })

    }

    const deleteFromFirebase = (url) => {
        console.log("Calling the function");
        // storage.refFromURL('url_ul')
        //1.
        let pictureRef = storage.refFromURL(url);
        //2.
        pictureRef.delete()
            .then(() => {
                //3.
                setImages(imagesArr.filter((image) => image !== url));
                // alert("Picture is deleted successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateReview = (id, title, description, location, rating) => {
        // window.location.replace(`/updateReview/${id}`);
        setReviewId(id);
        setTitle(title);
        setDescription(description);
        setLocation(location);
        setRating(rating);
        setVisibility(true);
    }

    function updateReviewForm() {
        const updatedPost = {
            title: title,
            description: description,
            location: location,
            rating: rating
        }

        axios.put(`http://localhost:8080/api/reviews/update/${reviewId}`, updatedPost).then((res) => {
            console.log(res.data);
            alert("Review Updated");

        }).catch((err) => {
            alert(err.message);
        })
    }

    


    return (
        <div className="bottom_review">
            <div className="bottom_left_review">
                {
                    reviews.map((review) => (
                        <div className="review_block">
                            <hr />
                            {
                                props.userId == sessionStorage.getItem("userId") &&(
                                    <DeleteOutlineOutlinedIcon color="error" onClick={() => deleteReview(review.id)} />
                                )
                            }
                            {
                                props.userId == sessionStorage.getItem("userId") &&(
                                    <BorderColorOutlinedIcon className="review_update_btn" color="success" onClick={() => updateReview(review.id, review.title, review.description, review.location, review.rating)} />
                                )
                            }
                           
                            <Model
                                isOpen={visibility}
                                onRequestClose={() => setVisibility(false)}
                                style={{
                                    overlay: {
                                        background: "grey",
                                        opacity: 0.94
                                    },
                                    content: {
                                        top: '20%',
                                        left: '30%',
                                        width: "500px",
                                    }
                                }}>

                                <CloseIcon
                                    onClick={() => setVisibility(false)}
                                    className="close-btn"
                                    color="error" />
                                <h3>Update Review</h3>


                                <form className="postReviewForm" onSubmit={updateReviewForm}>
                                    <div class="mb-3">
                                        <label for="reviewId" class="form-label">Review ID</label>
                                        <input type="text" class="form-control" id="reviewId" value={reviewId} disabled />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="Title" value={title} onChange={(e) => {
                                            setTitle(e.target.value)
                                        }} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Title" class="form-label">Description</label>
                                        <input type="text" class="form-control" id="Title" maxlength="400" value={description} onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Title" class="form-label">Location</label>
                                        <input type="text" class="form-control" id="Title" value={location} onChange={(e) => {
                                            setLocation(e.target.value)
                                        }} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="desc" class="form-label">Rating</label>
                                        <input type="text" class="form-control" id="desc" value={rating} onChange={(e) => {
                                            setRating(e.target.value)
                                        }} />
                                    </div>
                                    <button type="submit" class="btn btn-success">Update</button>
                                </form>
                            </Model>

                            <button className="btn btn-primary review_update_btn" onClick={() => {
                                window.location.replace(`/viewSingleReview/${review.id}`);
                            }}>View Review</button>

                            <div className="inner_title">
                                <h4>{review.title}</h4>
                            </div>

                            <div className="inner">
                                <img src={review.images[0]} alt="" />
                            </div>

                            <div className="inner_desc">
                                <p>{review.description.substring(0, 200) + " ..."}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}


