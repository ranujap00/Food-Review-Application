import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";

export default function CreatePost() {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [location, setLocation] = useState("");
    let [rating, setRating] = useState("");
    let [selectedImagesURL, setSelectedImagesURL] = useState([]);
    let [selectedImagesFilename, setSelectedImagesFilename] = useState([]);
    let [imageURLFirebase, setimageURLFirebase] = useState([]);

    async function sendData(e) {
        e.preventDefault();
        setImagesArray();
        await sleep(5000); // else have to double click submit button

        const date = new Date();
        let month = parseInt(date.getMonth())+1; 
        let currentDate = date.getFullYear() + "-" + month + "-" + date.getDate();

        const newPost = {
            images: imageURLFirebase,
            title: title,
            description: description,
            location: location,
            rating: rating,
            userId: sessionStorage.getItem("userId"),
            date: currentDate
        }
        // console.log("Post ID: " + newPost.id + "\nPost Name: " + newPost.name);

        // BELOW CODE ALSO WORKS WITHOUT ANY ERROR

        // fetch("http://localhost:8080/api/reviews/insert", {
        //     method: "POST",
        //     headers: {"Content-Type":"application/json"},
        //     body:JSON.stringify(newPost)
        // }).then(()=>{
        //     console.log("New post created");
        // })

        if (imageURLFirebase.length <= 4) {
            axios.post("http://localhost:8080/api/reviews/insert", newPost).then(() => {
                alert("Post added");
            }).catch((err) => {
                alert(err);
                console.log(err);
                console.log("Error with sending form data");
            })
        }
        else {
            alert("Maximum of 4 images can be selected");
        }
    }

    function onSelectFile(event) {
        let selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        if (selectedFilesArray.length <= 4) {
            //create a URL for each to preview the image
            const imagesArray = selectedFilesArray.map((file) => {
                let fileURL = URL.createObjectURL(file);
                return fileURL;
            })

            setSelectedImagesURL(imagesArray);
            setSelectedImagesFilename(selectedFilesArray);
        }
        else {
            alert("Maximum of 4 images can be selected");
        }
    }


    const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `images/${title}/${file.name}`);
        console.log("PATH: " + sotrageRef);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("Type: " + typeof downloadURL);
                    imageURLFirebase.push(downloadURL);
                });
            }
        );


        if (imageURLFirebase.length > 0) {
            console.log("Images are in the array");
        }
    };

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

    function setImagesArray() {
        for (let i = 0; i < selectedImagesFilename.length; i++) {
            uploadFiles(selectedImagesFilename[i]);
        }
    }

    return (
        <div className="postReviewContainer">
            <form className="postReviewForm" onSubmit={sendData} enctype="multipart/form-data">
                <div>
                    {selectedImagesURL.length <= 4 && selectedImagesURL.map((image, index) => {
                        return (
                            <img src={image} height={100} width={100} alt="PreviewImg" />
                        );
                    })}
                </div>
                <div class="mb-3">
                    <label for="Id" class="form-label">Images</label>
                    <input type="file" class="form-control" id="Id" onChange={onSelectFile} multiple />
                </div>
                <div class="mb-3">
                    <label for="Title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="Title" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div class="mb-3">
                    <label for="Title" class="form-label">Description</label>
                    {/* <input type="text" class="form-control" id="Title" maxlength="400" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} /> */}
                    <textarea id="Title" maxlength="400" class="form-control" rows="4" cols="50" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}>

                    </textarea>
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
                <button type="submit" class="btn btn-primary">Add review</button>
            </form>


        </div>
    )
}