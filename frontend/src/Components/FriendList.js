import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import "../CSS/FriendList.css"

export default function FriendList() {
    // const [name,setName] = useState("");
    // const [ProPic,setProPic] = useState("");
    const [friends, setFriends] = useState([]);
    const [mutualFriends, setMutualFriends] = useState(0);

    const {id} = useParams();

    useEffect(() => {
        function getAllFriends(){
            console.log("USER: " + sessionStorage.getItem("userId"));
            axios.get(`http://localhost:8080/api/user/${id}/allFollowers`).then((res) => {
                console.log(res.data);
                setFriends(res.data);   
            }).catch((err) =>{
                alert(err.message);
            })
        }
        getAllFriends();
    })

  return (
    <div className='page'>
      <div className='container'>
        <h2>My Friends</h2>
        {friends.length != 0 && (
            friends.map((friend) => (
               <div className='user'>
                    <td>{friend.username}</td>
                    <td>{friend.proPic}</td>
                </div>
            ))
        )}
      </div>

    </div>
  )
}