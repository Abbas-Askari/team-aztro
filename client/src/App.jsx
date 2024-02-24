import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import BackToTopButton from "./components/common/BackToTopButton";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";
import Navbar from "./components/common/Navbar";
import NewsLetter from "./components/common/NewsLetter";
import { closeDropdown, closeNotifications } from "./features/uiSlice";

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
  Register,
  Rewards,
} from "./pages";
import HotelSearch from "./pages/HotelsSearch";
import TripSearch from "./pages/TripSearch";

function App() {
  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const route = useLocation();

  // Show/Hide scroll to top button
  window.addEventListener("scroll", () => {
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
  });

  const handleCloseDropdown = (e) => {
    dispatch(closeDropdown());
    dispatch(closeNotifications());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Loader when page is loading
  window.addEventListener("load", () => {
    setShowLoader(false);
  });

  return (
    <div>
      {showLoader && <Loader />}
      <Navbar />
      <div className="min-h-screen" onClick={handleCloseDropdown}>
        <Routes>
          <Route path="/abc" element={<TripSearch />} />
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Home />} />
          <Route path="/hotels/search" element={<HotelSearch />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/hotels/:id/confirm-booking"
            element={<ConfirmBooking />}
          />
          <Route
            path="/hotel/:id/booking-sucess"
            element={<BookingSuccess />}
          />
          {/* <Route path="/trip/:id" element={<TripDetails />} /> */}
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <NewsLetter />
        <Footer />
      </div>

      <BackToTopButton showButton={showButton} />
    </div>
  );
}

export default App;
