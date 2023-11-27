import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForumHome from "./components/ForumHome";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ForumHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
