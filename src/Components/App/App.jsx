import {
  Navigate,
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";
import ProductPage from "../ProductPage/ProductPage.jsx";
import BuyNow from "../BuyNow/BuyNow.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { SearchContextProvider } from "../../context/searchContext.jsx";
import { ThemeProvider, useTheme } from "../../context/themeContext.jsx";
import SellerDashboard from "../Seller/SellerAdminPanel/SellerDashboard.jsx";
import Button from "../../GS-Libs/Buttons/Button.jsx";
import useAPI from "../../hooks/useAPI.js";
import { profileInitailValues } from "../../validations/profile-form.js";

const AppLayout = ({
  userDetails,
  showFilterSection,
  setShowFilterSection,
}) => {
  const { theme } = useTheme();
  const [showProfileSlider, setShowProfileSlider] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("CF_authToken") || ""
  );

  const setUserAuthToken = (token) => {
    setAuthToken(token);
  };

  return (
    <>
      <div
        className={`h-screen flex flex-col justify-between items-stretch ${
          theme === "light" ? "bg-White text-Black" : "bg-Black text-White"
        }`}
      >
        <SearchContextProvider>
          <Navbar
            showFilterSection={showFilterSection}
            setShowFilterSection={setShowFilterSection}
            showProfileSlider={showProfileSlider}
            setShowProfileSlider={setShowProfileSlider}
            userDetails={userDetails}
            showCartSlider={showCartSlider}
            setShowCartSlider={setShowCartSlider}
            userAuthToken={authToken}
            setUserAuthToken={setUserAuthToken}
          />
          <Outlet />
          {/* <Footer /> */}
        </SearchContextProvider>
      </div>
    </>
  );
};

// RequireSeller Component
const RequireSeller = ({ children, isSeller }) => {
  const navigate = useNavigate();

  if (!isSeller) {
    return (
      <div className="w-1/3 mx-auto h-full flex flex-col items-center justify-center">
        <div className="text-xl font-medium pb-4 text-center">
          Sorry, you are not seller. <br />
          Become seller to access admin panel.
        </div>
        <div className="w-1/3">
          <Button
            onClick={() => navigate("/")}
            text={"Go to Home Page"}
            primaryColor={true}
          />
        </div>
      </div>
    );
  }

  return children;
};

const App = () => {
  const [openCart, setOpenCart] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("CF_authToken") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("CF_authToken");
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

  const [userDetails, setUserDetails] = useState(profileInitailValues);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);

  const { data } = useAPI(
    "post",
    "/user-details",
    authToken ? true : false,
    {},
    {
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    }
  );

  useEffect(() => {
    if (data) {
      setUserDetails(data.userDetails);
    }
  }, [data]);

  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: (
        <ThemeProvider>
          <Login setUserAuthToken={setUserAuthToken} />
        </ThemeProvider>
      ),
    },
    {
      path: "/",
      element: (
        <ThemeProvider>
          <AppLayout
            userDetails={userDetails}
            showFilterSection={showFilterSection}
            setShowFilterSection={setShowFilterSection}
          />
        </ThemeProvider>
      ),
      children: [
        {
          path: "/home",
          element: (
            <Home
              showFilterSection={showFilterSection}
              setShowFilterSection={setShowFilterSection}
              openCart={openCart}
              setOpenCart={setOpenCart}
              userAuthToken={authToken}
              setUserAuthToken={setUserAuthToken}
              setShowCartSlider={setShowCartSlider}
            />
          ),
        },
        {
          path: "/product/:productID",
          element: <ProductPage handleOpenCart={handleOpenCart} />,
        },
        {
          path: "/product/buynow/:productID",
          element: <BuyNow />,
        },
        {
          path: "/seller-admin-panel",
          element: (
            <RequireSeller isSeller={userDetails.isSeller}>
              <SellerDashboard />
            </RequireSeller>
          ),
        },
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "*",
          element: <Navigate to="/home" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
