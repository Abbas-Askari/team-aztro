import React from "react";
import Banner from "../components/common/Banner";
import NavFilters from "../components/common/NavFilters";
import flightBanner from "../assets/7.jpg";
import { useDispatch, useSelector } from "react-redux";
import { closeFilterMenu, openFilterMenu, uiStore } from "../features/uiSlice";
import { FiChevronDown, FiDelete } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import Filters from "../components/common/Filters";
import { filters } from "../data/flightFilters";
import FlightsList from "../components/flights/FlightsList";
import Pagination from "../components/common/Pagination";
import TripsList from '../components/trips/TripsList'

const UmrahSearch = () => {
  const { isFilterMenuOpen } = useSelector(uiStore);
  const dispatch = useDispatch();
  const handleCloseFiltermenu = (e) => {
    if (e.target.classList.contains("filter-modal"))
      dispatch(closeFilterMenu());
  };
  return (
    <div>
      <Banner banner={flightBanner} title="Your best and comfortable Trip" />
      <NavFilters />
      <div className="pt-10 px-[3%] md:px-[6%]">
        <div className="grid md:grid-cols-4 gap-x-14">
          <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
            <div
              className={`filter-modal ${isFilterMenuOpen && "open"}`}
              onClick={handleCloseFiltermenu}
            >
              <div className={`filter-dialog ${isFilterMenuOpen && "open"}`}>
                <div className="flex-center-between border-b dark:border-dark md:hidden">
                  <p className="uppercase">Filters</p>
                  <div
                    className="icon-box md:hidden"
                    onClick={() => dispatch(closeFilterMenu())}
                  >
                    <FiDelete />
                  </div>
                </div>
                {/* <Filters filters={filters} /> */}
              </div>
            </div>
          </div>
          {/*---------------------------------------- Hotel List------------------------------------------------------ */}
          <div className="md:col-span-3 mt-5 md:mt-0 h-fit md:sticky top-0">
            <div className="flex-center-between">
              <div
                className="flex-align-center gap-4"
                onClick={() => dispatch(openFilterMenu())}
              >
                <div className=" md:hidden icon-box bg-white dark:bg-card-dark card-shadow dark:shadow-none card-bordered !rounded-md">
                  <BiFilterAlt />
                </div>
                <h3 className="text-sm">
                  <span className="text-muted">Showing:</span>125 Flights
                </h3>
              </div>
              <div className="flex-align-center gap-2">
                <p className="text-sm">Sort by:</p>
                <div className="flex-align-center gap-2">
                  <span className="text-sm text-primary">Posted Recently</span>
                  <FiChevronDown />
                </div>
              </div>
            </div>
            <TripsList />
            <Pagination itemsPerPage={5} url="/data/flights.json" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahSearch;
