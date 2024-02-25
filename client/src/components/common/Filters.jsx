import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addFilter, removeFilter } from "../features/uiSlice";

const Filters = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);


  const handleCheckboxChange = (filterName) => {
    const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.ui.selectedFilters);
    const updatedFilters = selectedFilters.includes(filterName)
      ? selectedFilters.filter((filter) => filter !== filterName)
      : [...selectedFilters, filterName];
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <>
      {filters.map(({ title, filters }) => (
        <div className="mt-6" key={title}>
          <h1 className="text-lg font-semibold capitalize">{title}</h1>
          {filters.map(({ name, number }) => (
            <div className="mt-3" key={name}>
              <div className="flex-center-between">
                <div className="input-check">
                  <input
                    type="checkbox"
                    id={name}
                    checked={selectedFilters.includes(name)}
                    onChange={() => handleCheckboxChange(name)}
                  />
                  <label htmlFor={name} className="capitalize">
                    {name}
                  </label>
                </div>
                <span className="px-1 py-[1px] bg-slate-200 rounded-sm dark:bg-card-dark">
                  {number}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Filters;
