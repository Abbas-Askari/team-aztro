import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTripAsync } from "../newTripSlice";
import HomeBanner from "../banners/banner.jpg";
import Banner from "../components/common/Banner";
import "./NewTripForm.css";
import MapComponent from "./map/MapComponent";

export const NewTripForm = () => {
  const { errors, loading } = useSelector((state) => state.newTrip);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [events, setEvents] = useState([]);

  console.log(events);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState();
  const [eventAmenities, setEventAmenities] = useState([]);

  const amenities = [
    "Free wifi 24/7",
    "Free computer",
    "Free Dstv/7",
    "Free clean bathroom",
    "Breakfast included",
  ];
  const [tripEvents, setTripEvents] = useState([]);
  const [adding, setAdding] = useState(false);

  const [images, setImages] = useState([]);

  const clearEvent = () => {
    // setEventName("");
    // setEventDescription("");
    // setEventTime(null);
    // setEventAmenities([]);
  };

  const dispatch = useDispatch();

  console.log(errors);

  function submit(e) {
    e.preventDefault();

    dispatch(
      createTripAsync({
        title,
        description,
        price: +price,
        timeline: events.map((event) => ({
          name: event.eventName,
          time: event.eventTime,
          description: event.eventDescription,
        })),
        reviews: [],
        agent: "65d9a617923591d668f727f2",
        images,
      })
    );
  }

  return (
    <div className="flex items-center">
      <div className="z-0 flex-1">
        <MapComponent></MapComponent>

      </div>
      <div className="flex-1">



        <form
          onSubmit={submit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div>
            {Array.from(images).map((image) => (
              <img
                className="w-96 object-contain bg-red-400"
                src={URL.createObjectURL(image)}
              />
            ))}
          </div>

          <div>
            <label htmlFor="name">Trip Name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="name"
              placeholder="Trip Name"
              id="name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tripname"
              className="block text-sm font-medium text-gray-700"
            >
              Trip Name
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="tripname"
              placeholder="Trip Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="text-error text-xs">
              {errors.find((err) => err.path === "title")?.message}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tripdesc"
              className="block text-sm font-medium text-gray-700"
            >
              Trip Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="tripdesc"
              placeholder="Trip Description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="text-error text-xs">
              {errors.find((err) => err.path === "description")?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="tripprice"
              className="block text-sm font-medium text-gray-700"
            >
              Trip Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="tripprice"
              placeholder="Trip Price"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="text-error text-xs">
              {errors.find((err) => err.path === "price")?.message}
            </div>
            <label htmlFor="files" className=" btn btn-primary">
              <span className="">Add images</span>
              <input
                type="file"
                id="files"
                multiple
                className="hidden"
                onChange={(e) =>
                  setImages((img) => [...Array.from(e.target.files), ...img])
                }
              />
            </label>
          </div>

          {tripEvents.map((event, i) => (
            <div key={i} className="mb-4">
              <p>Time: {event.time.toString()}</p>
              <p>Name: {event.name}</p>
              <p>Desc: {event.description}</p>
              <p>Amenities: {event.amenities.join(", ")}</p>
              <button
                type="button"
                onClick={() =>
                  setTripEvents((te) => te.slice(0, i).concat(te.slice(i + 1)))
                }
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}

          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Event
            </button>
          )}

      {adding && (
        <div className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="eventname"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              type="text"
              name="eventname"
              placeholder="Event Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventdesc"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <input
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              type="text"
              name="eventdesc"
              placeholder="Event Description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amenities
            </label>
            <div className="flex flex-col gap-2 mt-2">
              {amenities.map((amenity, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    checked={eventAmenities.includes(amenity)}
                    onChange={() =>
                      setEventAmenities((amenities) =>
                        amenities.includes(amenity)
                          ? amenities.filter((item) => item !== amenity)
                          : [...amenities, amenity]
                      )
                    }
                  />
                  <span className="ml-2">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="eventstart"
          className="block text-sm font-medium text-gray-700"
        >
          Event Timing
        </label>
        <input
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          type="datetime-local"
          name="eventstart"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* <div>
        <button
          type="button"
          onClick={() => {
            setTripEvents((te) => [
              ...te,
              {
                name: eventName,
                description: eventDescription,
                time: eventTime,
                amenities: eventAmenities,
              },
            ]);
            clearEvent();
            setAdding(false);
          }}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setAdding(false)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button> */}
      {/* </div> */}

          <button
            disabled={loading}
            className=" btn btn-primary  disabled:opacity-30 disabled:cursor-not-allowed"
          >
            submit
            {loading && <span className=" animate-spin"></span>}
          </button>
        </form>
       
      </div>
    </div>
  );
};
