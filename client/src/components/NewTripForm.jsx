import { useState } from "react";

export const NewTripForm = () => {
  
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [tripPrice, setTripPrice] = useState(0);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState();
  const [eventAmenities, setEventAmenities] = useState([]);
  const [tripEvents, setTripEvents] = useState([]);
  const [adding, setAdding] = useState(false);

  const amenities = [
    'Free wifi 24/7',
    'Free computer',
    'Free Dstv/7',
    'Free clean bathroom',
    'Breakfast included'
  ];

  const clearEvent = () => {
    setEventName("");
    setEventDescription("");
    setEventTime(null);
    setEventAmenities([]);
  }

  return (
    <form onSubmit={e => {e.preventDefault()}} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="tripname" className="block text-sm font-medium text-gray-700">Trip Name</label>
        <input value={tripName} onChange={(e) => setTripName(e.target.value)} type="text" name="tripname" placeholder="Trip Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="mb-4">
        <label htmlFor="tripdesc" className="block text-sm font-medium text-gray-700">Trip Description</label>
        <input value={tripDescription} onChange={(e) => setTripDescription(e.target.value)} type="text" name="tripdesc" placeholder="Trip Description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="mb-4">
        <label htmlFor="tripprice" className="block text-sm font-medium text-gray-700">Trip Price</label>
        <input value={tripPrice} onChange={(e) => setTripPrice(e.target.value)} type="number" name="tripprice" placeholder="Trip Price" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      {tripEvents.map((event, i) => 
      <div key={i} className="mb-4">
        <p>Time: {event.time.toString()}</p>
        <p>Name: {event.name}</p>
        <p>Desc: {event.description}</p>
        <p>Amenities: {event.amenities.join(', ')}</p>
        <button type="button" onClick={() => setTripEvents(te => te.slice(0, i).concat(te.slice(i+1)))} className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
      </div>)}

      {!adding && <button type="button" onClick={() => setAdding(true)} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Event</button>}

      {adding && 
      <div className="mt-4">
        <div className="mb-4">
          <label htmlFor="eventname" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input value={eventName} onChange={(e) => setEventName(e.target.value)} type="text" name="eventname" placeholder="Event Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="eventdesc" className="block text-sm font-medium text-gray-700">Event Description</label>
          <input value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} type="text" name="eventdesc" placeholder="Event Description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amenities</label>
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
        <div className="mb-4">
          <label htmlFor="eventstart" className="block text-sm font-medium text-gray-700">Event Timing</label>
          <input value={eventTime} onChange={(e) => setEventTime(e.target.value)} type="datetime-local" name="eventstart" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <button type="button" onClick={() => {setTripEvents(te => [...te, {name: eventName, description: eventDescription, time: eventTime, amenities: eventAmenities}]); clearEvent(); setAdding(false)}} className="mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add</button>
          <button type="button" onClick={() => setAdding(false)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Close</button>
        </div>
      </div>
      }
    </form>
  )
}
