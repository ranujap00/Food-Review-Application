// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import "../CSS/UpdateProfile.css";
// import { Button, Modal } from '@mui/material';

// export default function UpdateProfile({ open, handleClose }) {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [gender, setGender] = useState("");
//     const [proPic, setPropic] = useState("");

//     const { id } = useParams();

//     useEffect(() => {
//         axios.get(`http://localhost:8081/api/user/getUserById/${id}`).then((res) => {
//             console.log(res);
//             setName(res.data.name);
//             setEmail(res.data.email);
//             setGender(res.data.gender);
//             setPropic(res.data.proPic);
//         }).catch((err) => {
//             console.log(err);
//         })
//     }, [])

//     // function updateData(e) {
//     //     e.preventDefault();

//     //     const newUser = {
//     //         name,
//     //         email,
//     //         gender,
//     //         proPic
//     //     }
//     //     axios.put(`http://localhost:8081/api/user/updateUser/${id}`, newUser).then(() => {
//     //         alert("User details updated!");
//     //         // window.location.replace("http://localhost:3000/");
//     //         handleClose();
//     //     }).catch((err) => {
//     //         alert(err);
//     //     })
//     // }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//           const { data: res } = await axios.put(
//             `http://localhost:8081/api/user/updateUser/${id}`,
//             { name, email, gender, proPic }
//           );
//           console.log(res);
//           alert("Profile updated successfully!");
//         } catch (err) {
//           console.log(err);
//           alert("Error updating profile.");
//         }
//       };

//     return (
//         <Modal open={open} onClose={handleClose}>
//       <div className="updateProfile">
//         <h2>Update Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label>Email</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label>Profile Picture</label>
//           <input
//             type="text"
//             value={proPic}
//             onChange={(e) => setPropic(e.target.value)}
//           />
//           <div className="buttons">
//           <button className="closeBtn" onClick={() => SetOpen(false)}>Close</button>
//             <Button variant="contained" type="submit">
//               Save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//     );
// }

