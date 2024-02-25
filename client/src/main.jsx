
import {
  Blog,
  BlogPost,
  Bookings,
  BookingSuccess,
  ConfirmBooking,
  Home,
  HotelDetails,
  Login,
  PageNotFound,
  Profile,
  Register,
  Rewards,
  Wallet,
} from "./pages";
import HotelSearch from "./pages/HotelsSearch";



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store.js";
import TripSearch from "./pages/TripSearch";
import Navbar from "./components/common/Navbar";
import SignUp from "./components/Signup.jsx";
import { NewTripForm } from "./components/NewTripForm.jsx";
import Umrah from "./pages/Umrah";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },
  { path: "/", element: <Home /> },
  { path: "/hotels", element: <Home /> },
  { path: "/trips/search", element: <TripSearch /> },
  { path: "/hotels/search", element: <HotelSearch /> },
  { path: "/profile", element: <Profile /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/rewards", element: <Rewards /> },
  { path: "/blog", element: <Blog /> },
  { path: "/bookings", element: <Bookings /> },
  { path: "/hotels/:id/confirm-booking", element: <ConfirmBooking /> },
  { path: "/hotel/:id/booking-sucess", element: <BookingSuccess /> },
  { path: "/umrah", element: <Umrah /> },

  // { path: "/trip/:id", element: <TripDetails /> },
  { path: "/hotels/:id", element: <HotelDetails /> },
  { path: "/blog/:id", element: <BlogPost /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/new-trip",
    element: <NewTripForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
