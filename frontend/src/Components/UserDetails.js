import React from "react";
import { useState, useEffect } from "react";
import  storage  from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";

export default function UserDetails() {
  const [imageUpload, setImageUpload] = useState(null);
  const[imageList, setImageList] = useState([]);
  // const [name,setName] = useState("");

  const imageLisgtRef = ref(storage, "images/")
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev,url])
      })
    });
  };

  useEffect(() => { 
    listAll(imageLisgtRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageList((prev) => [...prev,url]);
            })
        })
    }) //listAll -> list all the files in a specific path
  },[]);

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <form>
          <div className="form-group">
            <label>Birthday</label>
            <br />
            <input type="date" required />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <br />
            <select className="selectGeneder" required>
              <option defaultValue={""}>Choose..</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <br />
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button onClick={uploadImage}>Upload Image</button>

            {imageList.map((url) =>{
                return <img src={url}/>
            })}
          </div>

          <button type="submit">Add User Details</button>
        </form>
      </div>
    </div>
  );
}