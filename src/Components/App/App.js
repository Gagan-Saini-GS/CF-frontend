import "./App.css";

import Login from "../Login/Login";
import { useState } from "react";

function App() {
  const [authToken, setAuthToken] = useState("");

  function setUser(token) {
    setAuthToken(token);
  }

  return (
    <div className="app-container">
      {authToken !== "" ? <div>hello</div> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
