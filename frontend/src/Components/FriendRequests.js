import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "../CSS/FriendRequests.css";


export default function FriendRequests() {
  // const [followers, setFollowers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  // const [followerId, setFollowerrId] = useState("");
  // const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/${id}/pendingRequests`)
      .then((res) => {
        console.log(res.data);
        setPendingRequests(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAccept = (requesterId) => {
    axios
      .put(
        `http://localhost:8080/api/user/${sessionStorage.getItem(
          "userId"
        )}/accept/${requesterId}`
      )
      .then((res) => {
        console.log(res.data);
        setPendingRequests((prevState) =>
          prevState.filter((request) => request.followerId !== id)
        );
        setMessage("You are now friends");
      })
      .catch((err) => console.error(err));
  };

  const handleDecline = (id) => {
    axios
      .put(
        `http://localhost:8080/api/user/${id}/declineRequest/${sessionStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setPendingRequests((prevState) =>
          prevState.filter((request) => request.followerId !== id)
        );
        setMessage("Request removed");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="requestpage">
      <h2>Friend Requests</h2>
      {pendingRequests.map((request) => (
        <div key={request.followerId} className="list">
          <td>{request.proPic}</td>
          <td>{request.username} </td>
          <button onClick={() => handleAccept(request.id)} className="btnAccept">Accept</button>
          <button onClick={() => handleDecline(request.id)} className="btnDecline">Decline</button>
        </div>
      ))}
    </div>
  );
}
