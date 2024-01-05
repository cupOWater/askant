// NOTE!!
// username of ADMIN account is 'Admin', usertype is "User" (We can set password as we want later).
// When admin successes to log in, it links to Admin page directly.
// When user(Not an admin) logs in, it links to Homepage(Forum page).

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForumHome from "./components/ForumHome";
import Admin from "./components/Admin"
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import PostDetail from "./components/PostDetail";
import Post from "./components/Post";
import { useEffect, useState } from "react";
import { userService } from "./service/userService";
import Category from "./components/Category";

function App() {
  const [user, setUser] = useState();
  
  useEffect(() => {
    if (localStorage.getItem("aToken")) {
      userService.getCurrent()
        .then(res => {
          if (res && res.status === 200) {
            setUser(res.data);
          }
        })
    }
  }, [])
  
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ForumHome user={user}/>} />
          <Route exact path="/:postId" element={<PostDetail user={user}/>} />
          <Route exact path="/post" element={<Post user={user}/>} />
          <Route exact path="/" element={<Category />} />


          <Route exact path="/logIn" element={<LogIn setUser={setUser} />} />
          <Route exact path="/register" element={<Register setUser={setUser} />} />

          <Route path='/unauth' element={<Unauthorized />} />

          <Route path='/admin' element={(true) ? <Admin /> : <Unauthorized />} />
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
