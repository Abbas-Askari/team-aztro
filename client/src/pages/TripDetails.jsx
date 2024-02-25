import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { Tabs as TabWrapper, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  AddReview,
  Amenities,
  Description,
  Features,
  HotelFeatures,
  PriceDetails,
  Reviews,
  RoomPrice,
  RoomSelections,
  Trending,
} from "../components/trip-details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import { date } from "zod";
import Timeline from "../components/timeline/Timeline";
import umrahTimelineElements from "../components/timeline/timelineElements";

const RatingDescriptions = [
  "Very Poor",
  "Poor",
  "Good",
  "Very Good",
  "Perfect",
];

const fakeTrip = {
  title: "Pir Chinasi",
  description:
    "Embark on a hike to Pir Chinasi, Pakistan's prestigious and most beautiful peak.",
  timeline: [
    {
      time: new Date(),
      name: "Breakfast",
      description: "Let's start the day with some breakfast",
    },
    { time: new Date(), name: "Begin Hike", description: "We begin the hike" },
    {
      time: new Date(),
      name: "Lunch",
      description:
        "After conquering the peak, we will have lunch on the famous Monal Restaurant",
    },
    {
      time: new Date(),
      name: "Climb Down",
      description: "Return back to the transport facilities",
    },
    {
      time: new Date(),
      name: "Dinner",
      description: "Have KFC and Go Back home",
    },
  ],
  agent: {
    name: "Zain Travels",
  },
  price: 50000,
  reviews: [
    {
      username: "Taha Shah",
      title: "So Much Fun",
      content:
        "This was my first independent trip after high school. I enjoyed alot with my friends and the accommodations were outstanding. Thank You Zain Travels for such an amazing experience",
      rating: 3.7,
    },
    {
      username: "Taha Shah",
      title: "So Much Fun",
      content:
        "This was my first independent trip after high school. I enjoyed alot with my friends and the accommodations were outstanding. Thank You Zain Travels for such an amazing experience",
      rating: 3.6,
    },
    {
      username: "Taha Shah",
      title: "So Much Fun",
      content:
        "This was my first independent trip after high school. I enjoyed alot with my friends and the accommodations were outstanding. Thank You Zain Travels for such an amazing experience",
      rating: 3.2,
    },
    {
      username: "Taha Shah",
      title: "So Much Fun",
      content:
        "This was my first independent trip after high school. I enjoyed alot with my friends and the accommodations were outstanding. Thank You Zain Travels for such an amazing experience",
      rating: 4.7,
    },
  ],
};

const TripDetails = () => {
  const { id: tripId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        import.meta.env.VITE_BACKEND + "/trips/trip/" + tripId
      );
      const newData = await res.json();
      console.log(newData);
      setData(newData.trip);
    })();
  }, []);

  const avgRating = data?.reviews.length
    ? data?.reviews.reduce((sum, review) => sum + review.rating, 0) /
      data?.reviews.length
    : "No Reviews";

  return (
    <div className="pt-16 px-[3%] md:px-[6%]">
      <h1 className="text-3xl md:text-4xl font-bold capitalize">
        {data?.agent.name}
      </h1>
      <div className="mt-4 flex-align-center gap-x-3">
        <div className="flex-align-center gap-x-2">
          <FaStar className="text-secondaryYellow" />
          <p className="flex gap-1">
            <span>{avgRating !== -1 && avgRating}</span>
            <span className="opacity-70">
              ({data?.reviews.length ? data?.reviews.length : "No"} reviews)
            </span>
          </p>
        </div>
        <div className="flex-align-center gap-x-2">
          <BiMap />
          <p>Zurich town, Switzerland</p>
        </div>
      </div>
      <ImageCarousel images={data?.images ? data.images : []} />
      <div className="mt-5 flex-align-center gap-2 sm:gap-3 flex-col sm:flex-row">
        <div className="flex-align-center gap-x-2 sm:gap-x-3">
          <span className="text-sm text-green-500 bg-green-500/20 px-2 rounded">
            {avgRating}
          </span>
          <span className="text-sm text-secondaryYellow bg-secondaryYellow/20 px-2 rounded">
            {RatingDescriptions[Math.min(4, Math.floor(avgRating))]}
          </span>
          <span className="text-sm text-primary bg-primary/20 px-2 rounded">
            Trips
          </span>
          <span className="text-sm text-secondaryRed bg-secondaryRed/20 px-2 rounded">
            Travel
          </span>
        </div>
        <div className="flex-align-center gap-x-3">
          {Array.apply(null, { length: 5 }).map((_, i) => (
            <div key={i} className="text-secondaryYellow">
              {i < avgRating ? <FaStar /> : <FaRegStar />}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold capitalize mt-4">{data?.title}</h1>
          <p className="mt-2">Zurich, switzerland</p>
          {/* Tab Component */}
          <div className="pt-10">
            <TabWrapper>
              <TabList>
                <Tab>Description</Tab>
                {/* <Tab>Features</Tab>
                <Tab>Room & Price</Tab> */}
                <Tab>Reviews</Tab>
              </TabList>
              <TabPanel>
                <Description text={data?.description} />
              </TabPanel>
              {/* <TabPanel>
                <Features />
              </TabPanel>
              <TabPanel>
                <RoomPrice />
              </TabPanel> */}
              <TabPanel>
                <Reviews reviews={data?.reviews || []} />
              </TabPanel>
            </TabWrapper>
          </div>

          {/* ------------------ */}

          <HotelFeatures />
          <Amenities />

          <button className="btn btn-primary mt-5">more details</button>
        </div>
        <div className="lg:col-span-1">
          {data && <PriceDetails trip={data} />}
        </div>
      </div>

      {/* <RoomSelections /> */}
      <div className="my-4">
        {data?.timeline?.length !== 0 && <Timeline timelineElements={data?.timeline.map(tle => {return {id: tle._id, title: tle.name, descriptions: [tle.description], date: new Date(tle.time).toLocaleTimeString() + ", " + new Date(tle.time).toDateString(), location: "", buttonText: "", icon: "work"}})} />}
      </div>
      <AddReview />
      <Trending />
    </div>
  );
};

export default TripDetails;
