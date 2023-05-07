import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import HomePage from './Components/HomePage';
import CreatePost from './Components/CreatePost';
import DisplaySingleReview from './Components/DisplaySingleReview';
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import DisplaySingleUserProfile from "./Components/DisplaySingleUserProfile";
import DisplayCommentByReview from "./Components/DisplayCommentByReview";
import './App.css'
import DisplayProfile from './Components/DisplayProfile'
import UpdateProfile from './Components/UpdateProfile';
import DisplayReviewsByUser from "./Components/DisplayReviewsByUser";
import UpdateReview from "./Components/UpdateReview";

function App() {
  return (
    <Router>
      <div className="app">
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<CreatePost />} />
          <Route path="/viewSingleReview/:id" element={<DisplaySingleReview />} />
          <Route path="/viewSingleUser/:username" element={<DisplaySingleUserProfile />} />
          <Route path="/displayCommentByReview" element={<DisplayCommentByReview />} />
          <Route path="/allReviewsByUser" element={<DisplayReviewsByUser/>}/>
          <Route path="/updateReview/:id" element={<UpdateReview />} />

          <Route path="/UserProfile/:id" element={<DisplayProfile/>} />
          {/* <Route path="/userProfileByUsername/:username" element={<DisplayProfile/>} /> */}
          {/* <Route path="/profile/:id" element={<DisplayProfile/>} /> */}
          <Route path="/profile/:id/update" element={<UpdateProfile/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
