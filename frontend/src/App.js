import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForumHome from "./components/ForumHome";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ForumHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
