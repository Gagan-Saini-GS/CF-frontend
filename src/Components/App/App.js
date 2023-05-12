import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Home from "../Home/Home";
import SellerAccount from "../Seller/SellerAccount/SellerAccount";
import Profile from "../Profile/Profile";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UploadProduct from "../UploadProduct/UploadProduct";
import ProductList from "../ProductList/ProductList";
import SearchProductList from "../ProductList/SearchProductList";
import ProductPage from "../ProductPage/ProductPage";
import Cart from "../Cart/Cart";
import BuyNow from "../BuyNow/BuyNow";
import Footer from "../Footer/Footer";

function App() {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log(token);
    setAuthToken(token);
  }, []);

  function setUser(token) {
    // console.log(token);
    setAuthToken(token);
  }

  return (
    <Router>
      <div className="app-container">
        {authToken === "" || authToken === null || authToken === undefined ? (
          <div>
            <Routes>
              {/* <Route path="/" element={<Navigate to="/logout" />} /> */}
              <Route path="/logout" element={<Login setUser={setUser} />} />
            </Routes>
          </div>
        ) : (
          <div>
            {console.log(authToken)}
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/my-orders" element={<Profile />} />
              <Route path="/become-seller" element={<SellerAccount />} />
              <Route
                path="/my-profile/update-profile"
                element={<UpdateProfile />}
              />
              <Route path="/upload-product" element={<UploadProduct />} />
              <Route path={"/products/:filter"} element={<ProductList />} />
              <Route
                path={"/products/search-results/:query"}
                element={<SearchProductList />}
              />
              <Route path={"/product/:productID"} element={<ProductPage />} />
              <Route path={"/product/buynow/:productID"} element={<BuyNow />} />
              <Route path={"/cart"} element={<Cart />} />
            </Routes>

            <Footer />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
