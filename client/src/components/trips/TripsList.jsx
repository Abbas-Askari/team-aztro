import { useSelector } from "react-redux";
import { dataStore } from "../../features/dataSlice";
import LoadingSkeleton from "../skeletons/LoadingSkeleton";
import SingleTrip from "./SingleTrip";

const TripsList = () => {
  const { currentDataItems, loading } = useSelector(dataStore);
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
