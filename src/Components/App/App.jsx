import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";
import ProductPage from "../ProductPage/ProductPage.jsx";
import BuyNow from "../BuyNow/BuyNow.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token !== authToken) {
      setAuthToken(token);
    }
  }, [authToken]);

  const setUserAuthToken = (token) => {
    setAuthToken(token);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };
  const [showProfileSlider, setShowProfileSlider] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);

  return (
    <Router>
      <div className="h-screen bg-White">
        <div>
          <Navbar
            showProfileSlider={showProfileSlider}
            setShowProfileSlider={setShowProfileSlider}
            showCartSlider={showCartSlider}
            setShowCartSlider={setShowCartSlider}
            userAuthToken={authToken}
            setUserAuthToken={setUserAuthToken}
          />
          <Routes>
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/home" />} />

            {/* Other Routes */}
            <Route
              path="/login"
              element={<Login setUserAuthToken={setUserAuthToken} />}
            />
            <Route
              path="/home"
              element={
                <Home
                  openCart={openCart}
                  setOpenCart={setOpenCart}
                  userAuthToken={authToken}
                  setUserAuthToken={setUserAuthToken}
                  setShowCartSlider={setShowCartSlider}
                />
              }
            />
            <Route
              path={"/product/:productID"}
              element={<ProductPage handleOpenCart={handleOpenCart} />}
            />
            <Route path={"/product/buynow/:productID"} element={<BuyNow />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
