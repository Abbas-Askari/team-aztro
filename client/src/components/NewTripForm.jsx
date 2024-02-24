import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTripAsync } from "../newTripSlice";

export const NewTripForm = () => {
  const { errors, loading } = useSelector((state) => state.newTrip);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState();
  const [tripEvents, setTripEvents] = useState([]);
  const [adding, setAdding] = useState(false);

  const [images, setImages] = useState([]);

  const clearEvent = () => {
    // setEventName("");
    // setEventDescription("");
    // setEventTime(null);
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
        timeline: [],
        reviews: [],
        agent: "65d9a617923591d668f727f2",
        images,
      })
    );
  }

  return (
    <form onSubmit={submit}>
      <div>
        {Array.from(images).map((image) => (
          <img
            className="w-96 object-contain bg-red-400"
            src={URL.createObjectURL(image)}
          />
        ))}
      </div>
      <div>
        <label htmlFor="files" className=" btn btn-primary">
          <span>Add images</span>
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
      <div className="text-error">
        {errors.find((err) => err.path === "title")?.message}
      </div>
      <div>
        <label htmlFor="tripdesc">Trip Desc</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="tripdesc"
          placeholder="Trip Description"
          id=""
        />
      </div>
      <div className="text-error">
        {errors.find((err) => err.path === "description")?.message}
      </div>
      <div>
        <label htmlFor="tripprice">Trip Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          name="tripprice"
          placeholder="Trip Price"
          id=""
        />
      </div>
      <div className="text-error">
        {errors.find((err) => err.path === "price")?.message}
      </div>

      {tripEvents.map((event, i) => (
        <div>
          <p>Time: {event.time.toString()}</p>
          <p>Name: {event.name}</p>
          <p>Desc: {event.description}</p>
          <button
            type="button"
            onClick={() =>
              setTripEvents((te) => te.slice(0, i).concat(te.slice(i + 1)))
            }
          >
            Delete
          </button>
        </div>
      ))}

      {!adding && (
        <button type="button" onClick={() => setAdding(true)}>
          Add Event
        </button>
      )}

      {adding && (
        <div>
          <div>
            <div>
              <label htmlFor="eventname">Event Name</label>
              <input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                type="text"
                name="eventname"
                placeholder="Event Name"
                id=""
              />
            </div>
            <div>
              <label htmlFor="eventdesc">Event Description</label>
              <input
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                type="text"
                name="eventdesc"
                placeholder="Event Description"
                id=""
              />
            </div>
            <div>
              <label htmlFor="eventstart">Event Timing</label>
              <input
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                type="datetime-local"
                name="eventstart"
                id=""
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setTripEvents((te) => [
                  ...te,
                  {
                    name: eventName,
                    description: eventDescription,
                    time: eventTime,
                  },
                ]);
                clearEvent();
                setAdding(false);
              }}
            >
              Add
            </button>
            <button type="button" onClick={() => setAdding(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <button
        disabled={loading}
        className=" btn btn-primary  disabled:opacity-30 disabled:cursor-not-allowed"
      >
        submit
        {loading && <span className=" animate-spin"></span>}
      </button>
    </form>
  );
};
