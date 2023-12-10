// NOTE!!
// username of ADMIN account is 'Admin', usertype is "User" (We can set password as we want later).
// When admin successes to log in, it links to Admin page directly.
// When user(Not an admin) logs in, it links to Homepage(Forum page).

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import ForumHome from "./components/ForumHome";
import Admin from "./components/Admin"
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthrozied";
import Footer from "./components/Footer";
import Shop from "./components/Shop";

function App() {
  const [user, setUser] = useState({}); // info about logged user from database; username is ID
  const username = "Admin" // MUST delete after backend done; dummy
  const [userType, setUserType] = useState("User"); // "" -> Guest, "User" -> User
  return (
    <Router>
      <Header userType={userType} username={user.username} />
      <div className="App">
        <Routes>
          {/* <Route exact path="/" element={<ForumHome />} /> */}

          <Route exact path="/" element={<Shop />} />


          <Route exact path="/logIn" element={<LogIn userType={userType} user={user} />} />
          <Route exact path="/register" element={<Register userType={userType} user={user} />} />

          <Route path='/unauth' element={<Unauthorized />} />

          <Route path='/admin' element={(userType==="User" && username==="Admin")?<Admin />:<Unauthorized />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
