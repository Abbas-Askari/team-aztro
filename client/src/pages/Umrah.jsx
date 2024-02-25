import React from "react";
import Banner from "../components/common/Banner";
import NavFilters from "../components/common/NavFilters";
import { BestWay, Deals, FAQs } from "../components/flights";
import Timeline from "../components/timeline/Timeline";
import umrahTimelineElements from "../components/timeline/timelineElements";
import FlightBanner from '../assets/7.jpg';
import { Link } from "react-router-dom";

const Umrah = () => {
  return (
    <div>
      <Banner banner={FlightBanner} title="" />
      <NavFilters url="/umrah/search" />
      <div className="mt-5 px-[3%] md:px-[6%]">
        <Deals />
    <div className="bg-gray-100 p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Plan Your Next Adventure!</h2>
      <p className="text-lg text-gray-600 mb-8">Book now and explore the world with us!</p>
      <Link to='/umrah/search'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
      </Link>
    </div>
 
        <Timeline timelineElements={umrahTimelineElements}/>
        <FAQs />
      </div>
    </div>
  );
};

export default Umrah;
