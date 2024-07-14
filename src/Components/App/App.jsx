import {
  Navigate,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";
import ProductPage from "../ProductPage/ProductPage.jsx";
import BuyNow from "../BuyNow/BuyNow.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { SearchContextProvider } from "../../context/searchContext.jsx";

const AppLayout = ({ showFilterSection, setShowFilterSection }) => {
  const [showProfileSlider, setShowProfileSlider] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  const setUserAuthToken = (token) => {
    setAuthToken(token);
  };

  return (
    <div className="h-screen bg-White ">
      <SearchContextProvider>
        <Navbar
          showFilterSection={showFilterSection}
          setShowFilterSection={setShowFilterSection}
          showProfileSlider={showProfileSlider}
          setShowProfileSlider={setShowProfileSlider}
          showCartSlider={showCartSlider}
          setShowCartSlider={setShowCartSlider}
          userAuthToken={authToken}
          setUserAuthToken={setUserAuthToken}
        />
        <Outlet />
        {/* <Footer /> */}
      </SearchContextProvider>
    </div>
  );
};

const App = () => {
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

  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);

  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login setUserAuthToken={setUserAuthToken} />,
    },
    {
      path: "/",
      element: (
        <AppLayout
          showFilterSection={showFilterSection}
          setShowFilterSection={setShowFilterSection}
        />
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
