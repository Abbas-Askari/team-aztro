import React from "react";
import Banner from "../components/common/Banner";
import NavFilters from "../components/common/NavFilters";
import FlightBanner from "../assets/7.jpg";
import { BestWay, Deals, FAQs } from "../components/flights";
import Timeline from "../components/timeline/Timeline";
import umrahTimelineElements from "../components/timeline/timelineElements";


const Umrah = () => {
  return (
    <div>
      <Banner banner={FlightBanner} title="" />
      <NavFilters url="/umrah/search" />
      <div className="mt-5 px-[3%] md:px-[6%]">
        <Deals />
        <Timeline timelineElements={umrahTimelineElements}/>
        <FAQs />
      </div>
    </div>
  );
};

export default Umrah;
