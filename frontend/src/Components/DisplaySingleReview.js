import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/getSingleReview.css";
import "../CSS/likeBtn.css";
import axios from "axios";
import 'react-slideshow-image/dist/styles.css'
import SimpleImageSlider from "react-simple-image-slider";
import { Rating } from 'react-simple-star-rating';
import DisplayCommentByReview from './DisplayCommentByReview';

export default function DisplaySingleReview() {

    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState("");
    const [date, setDate] = useState("");
    const [user, setUser] = useState("");

    let [likeCount, setLikeCount] = useState(50);
    const [activeBtn, setActiveBtn] = useState("none");

    const [comment, setComment] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const getReviewById = async () => {
            const { data: res } = await axios.get(`http://localhost:8080/api/reviews/getReviewById/${id}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} });
            console.log("result :" + res.likeCount);
            setImages(res.images);
            setTitle(res.title);
            setDescription(res.description);
            setLocation(res.location);
            setRating(res.rating);
            setLikeCount(res.likeCount);
            setUserId(res.userId);
            setDate(res.date);


            for (let i = 0; i < images.length; i++) {
                console.log(images[i]);
            }
            axios.get(`http://localhost:8080/api/user/getUserById/${sessionStorage.getItem("userId")}`).then((res) => {
                setUser(res.data);
            }).catch((err) => {
                alert(err.message);
            })

        }
        getReviewById();

    }, []);

    const objArray = [];

    for (var x = 0; x < images.length; x++) {
        console.log("he he he");
        let objects = { url: images[x] };
        objArray.push(objects);
    }
    console.log(objArray);

    function handleLikeClick() {
        //get user details
        axios.get(`http://localhost:8080/api/user/getUserById/${sessionStorage.getItem("userId")}`).then((res) => {
            console.log("rrr: " + res.data);
            let alreadyLiked = false;

            for (let i in res.data.likeArray) {
                if (res.data.likeArray[i] == id) {
                    alreadyLiked = true;
                    console.log("Liked");
                }
            }

            if (!alreadyLiked) {
                let newLikeArr = [];
                newLikeArr = res.data.likeArray;
                newLikeArr.push(id);

                const updatedUser = {
                    id: sessionStorage.getItem("userId"),
                    username: res.data.username,
                    email: res.data.email,
                    likeArray: newLikeArr
                }
                console.log("updated user: " + newLikeArr);

                axios.put(`http://localhost:8080/api/user/updateUser/${sessionStorage.getItem("userId")}`, updatedUser).then((res) => {
                    console.log(res.data);

                    // If the user has not liked the review 
                    console.log("new post: " + likeCount);
                    likeCount = likeCount + 1;
                    setLikeCount(likeCount);
                    setActiveBtn("like");

                    const newPost = {
                        images: images,
                        title: title,
                        description: description,
                        location: location,
                        rating: rating,
                        likeCount: likeCount
                    }

                    console.log("new post: " + likeCount);

                    axios.put(`http://localhost:8080/api/reviews/updateReviewById/${id}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} }, newPost).then((res) => {
                        console.log(res.data);
                        sendNotification("like");

                    }).catch((err) => {
                        alert(err.message);
                    })

                }).catch((err) => {
                    alert(err.message);
                })
            }
            else {
                console.log("User has already liked this review");
                setActiveBtn("like");
            }

        }).catch((err) => {
            alert(err.message);
        })


        // if (activeBtn === 'like') {
        //     setLikeCount(likeCount - 1);
        //     setActiveBtn("none");
        //     return;
        // }

        // if (activeBtn === "dislike") {
        //     setLikeCount(likeCount + 1);
        //     setDislikeCount(likeCount - 1);
        //     setActiveBtn("like");
        // }
    };

    function sendNotification(type) {


        let notificationContent = "";
        if (type == "comment") {
            notificationContent = `${user.username} commented on your post ${title}`;
        }
        else if (type == 'like') {
            notificationContent = `${user.username} liked your post ${title}`;
        }
        // notificationContent = `${sessionStorage.getItem("userId")} commented your post`;
        const notificationObj = {
            content: notificationContent,
            to: userId,
            from: sessionStorage.getItem("userId")
        }

        axios.post(`http://localhost:8080/api/notification/insertNotification`, notificationObj).then((res) => {
            console.log(res.data);

        }).catch((err) => {
            alert(err.message);
        })
    }

    function addComment() {
        const date = new Date();
        let month = parseInt(date.getMonth()) + 1;
        let currentDate = date.getFullYear() + "-" + month + "-" + date.getDate();

        console.log("Executing add comment");
        const commentObj = {
            description: comment,
            review_Id: id,
            user_Id: sessionStorage.getItem("userId"),
            date: currentDate
        }

        sendNotification("comment");
        axios.post(`http://localhost:8080/api/comment/insert`, commentObj).then((res) => {
            console.log("inserted comment: " + res.data);
            // setComment(null);
        }).catch((err) => {
            alert(err.message);
        })
    }


    return (

        <div>
            <div class="card-wrapper">
                <div class="card">
                    {/* <!-- card left --> */}
                    <div>
                        <SimpleImageSlider
                            width={500}
                            height={320}
                            images={objArray}
                            showNavs={true}
                            startIndex={0}
                            autoPlay
                        />
                    </div>

                    {/* <!-- card right --> */}
                    <div class="product-content">
                        <h2 class="product-title">{title}</h2>
                        <p>{date}</p>
                        <div class="product-rating">
                            <Rating
                                initialValue={rating}
                                readonly
                            /* Available Props */
                            />
                            <span>{rating}</span>
                        </div>

                        <div class="product-price">
                            <p class="last-price">Location: <span><a>{location}</a></span></p>
                        </div>

                        <div class="product-detail">
                            <p>{description}</p>
                        </div>
                        <button
                            className={`likeBtn ${activeBtn === "like" ? "like-active" : ""}`}
                            onClick={handleLikeClick}>
                            Like {likeCount}
                        </button>
                    </div>
                </div>
            </div>

            {/* display comments component */}
            <div className="commentContainer">
                <form onSubmit={addComment}>
                    <input type="text" className="addCommentBox" value={comment} placeholder="add comment ..." onChange={(e) => {
                        setComment(e.target.value)
                    }} />
                    <button className="btn btn-success btn-sm addCommentBtn" type="submit">Add</button>
                </form>

                <DisplayCommentByReview reviewId={id} userId={userId} />
            </div>
        </div>
    )
}