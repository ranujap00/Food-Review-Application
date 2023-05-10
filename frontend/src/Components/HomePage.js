import React, { useState, useEffect } from "react";
import "../CSS/product.css";
import axios from "axios";
import "../App.css";
import { Rating } from 'react-simple-star-rating';


export default function HomePage() {
    const [reviews, setReviews] = useState([]); 

    useEffect(() => {
        function getAllReviews() {
            console.log("Session:  " + sessionStorage.getItem("accessToken"))
            axios.get("http://localhost:8080/api/reviews/all").then((res) => {
                console.log(res.data);
                setReviews(res.data);
                
            }).catch((err) => {
                alert(err.message);
            })
        }
        getAllReviews();

    }, [])

    // function displayReviews(){
    //     for(let i = 0; i < reviews.length; i++){
    //         console.log(reviews[i]);
    //     }
    // }
    // displayReviews();

    return (
        <div className="outerContainer">

            <div class="container">
                <div class="reviews">
                    {reviews.length != 0 &&(
                        reviews.map((review) => (
                            <a>
                                <div class="review">
                                    <div class="image">
                                        <img src={review.images[0]} alt="" />
                                    </div>
                                    <div class="titleRating">
                                        <h4>{review.title}</h4>
                                        
                                        {/* <span>{review.rating}</span> */}
                                    </div>
                                    <div>
                                        <Rating
                                            initialValue={review.rating}
                                            readonly
                                        /* Available Props */
                                        />
                                    </div>
                                    <br/>
                                    <div>
                                        <h5>{review.location}</h5>
                                    </div>
                                    <p>{review.description}</p>
                                    <p>{review.date}</p>
                                    
                                    <div class="viewMore">
                                        <button onClick={() => {
                                            window.location.replace(`/viewSingleReview/${review.id}`);
                                        }}> View More </button>
                                    </div>
                                </div>
                            </a>

                        ))
                    )
                        
                    }
                </div>
            </div>

        </div>
    )
}