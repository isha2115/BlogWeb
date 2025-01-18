import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import path from "./Common/Path";

import SignUp from "./Screens/Signup";
import { useState } from "react";
import Layout from "./Screens/Layout";
import Login from "./Screens/Login";
import BlogListing from "./Screens/Blog";

function App() {
  const [Auth, setAuth] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path={path.home}
            element={<Layout Auth={Auth} component={<BlogListing />} />}
          />
          <Route path={path.signup} element={<SignUp setAuth={setAuth} />} />
          <Route path={path.login} element={<Login setAuth={setAuth} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
