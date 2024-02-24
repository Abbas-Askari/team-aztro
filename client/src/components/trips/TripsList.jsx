import { useSelector } from "react-redux";
import { dataStore } from "../../features/dataSlice";
import LoadingSkeleton from "../skeletons/LoadingSkeleton";
import SingleTrip from "./SingleTrip";
import { useEffect, useState } from "react";

const TripsList = () => {
  let { currentDataItems, loading } = useSelector(dataStore);
  const [realData, setRealDate] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND + "/trips")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRealDate(data.trips);
      });
  });

  if (realData.length > 0) {
    return loading ? (
      <LoadingSkeleton basis="basis-[18rem]" />
    ) : (
      <div className="flex flex-wrap gap-4 mt-10">
        {realData?.map((trip) => (
          <SingleTrip {...trip} key={trip?.id} />
        ))}
      </div>
    );
  }

  return loading ? (
    <LoadingSkeleton basis="basis-[18rem]" />
  ) : (
    <div className="flex flex-wrap gap-4 mt-10">
      {currentDataItems?.map((trip) => (
        <SingleTrip {...trip} key={trip?.id} />
      ))}
    </div>
  );
};

export default TripsList;
