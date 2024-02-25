import { useDispatch, useSelector } from "react-redux";
import {
  dataStore,
  getCurrentItems,
  setIsLoading,
} from "../../features/dataSlice";
import LoadingSkeleton from "../skeletons/LoadingSkeleton";
import SingleTrip from "./SingleTrip";
import { useEffect, useState } from "react";

const TripsList = () => {
  let { currentDataItems, loading } = useSelector(dataStore);
  const [realData, setRealDate] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetch(import.meta.env.VITE_BACKEND + "/trips")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRealDate(data.trips);
        dispatch(setIsLoading(false));
        dispatch(getCurrentItems(data.trips));
      });
  }, []);

  // if (realData.length > 0) {
  //   return loading ? (
  //     <LoadingSkeleton basis="basis-[18rem]" />
  //   ) : (
  //     <div className="flex flex-wrap gap-4 mt-10">
  //       {realData?.map((trip) => (
  //         <SingleTrip {...trip} key={trip?.id} />
  //       ))}
  //     </div>
  //   );
  // }

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
