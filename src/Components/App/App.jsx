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

const AppLayout = () => {
  const [showProfileSlider, setShowProfileSlider] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  const setUserAuthToken = (token) => {
    setAuthToken(token);
  };

  return (
    <div className="h-screen bg-White">
      <Navbar
        showProfileSlider={showProfileSlider}
        setShowProfileSlider={setShowProfileSlider}
        showCartSlider={showCartSlider}
        setShowCartSlider={setShowCartSlider}
        userAuthToken={authToken}
        setUserAuthToken={setUserAuthToken}
      />
      <Outlet />
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

  const [showCartSlider, setShowCartSlider] = useState(false);

  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login setUserAuthToken={setUserAuthToken} />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/home",
          element: (
            <Home
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
