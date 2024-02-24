import { useState } from "react"

export const NewTripForm = () => {
  
  const [tripName, setTripName] = useState("")
  const [tripDescription, setTripDescription] = useState("")
  const [tripPrice, setTripPrice] = useState(0)

  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventTime, setEventTime] = useState()
  const [tripEvents, setTripEvents] = useState([])
  const [adding, setAdding] = useState(false)

  const clearEvent = () => {
    setEventName("")
    setEventDescription("")
    setEventTime(null)
  }

  return (
    <form onSubmit={e => {e.preventDefault()}}>
      <div>
        <label htmlFor="tripname">Trip Name</label>
        <input value={tripName} onChange={(e) => setTripName(e.target.value)} type="text" name="tripname" placeholder="Trip Name" id="" />
      </div>
      <div>
        <label htmlFor="tripdesc">Trip Desc</label>
        <input value={tripDescription} onChange={(e) => setTripDescription(e.target.value)} type="text" name="tripdesc" placeholder="Trip Description" id="" />
      </div>
      <div>
        <label htmlFor="tripprice">Trip Price</label>
        <input value={tripPrice} onChange={(e) => setTripPrice(e.target.value)} type="number" name="tripprice" placeholder="Trip Price" id="" />
      </div>

      {tripEvents.map((event, i) => 
      <div>
        <p>Time: {event.time.toString()}</p>
        <p>Name: {event.name}</p>
        <p>Desc: {event.description}</p>
        <button type="button" onClick={() => setTripEvents(te => te.slice(0, i).concat(te.slice(i+1)))}>Delete</button>
      </div>)}

      {!adding && <button type="button" onClick={() => setAdding(true)}>Add Event</button>}

      {adding && 
      <div>
        <div>
          <div>
            <label htmlFor="eventname">Event Name</label>
            <input value={eventName} onChange={(e) => setEventName(e.target.value)} type="text" name="eventname" placeholder="Event Name" id="" />
          </div>
          <div>
            <label htmlFor="eventdesc">Event Description</label>
            <input value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} type="text" name="eventdesc" placeholder="Event Description" id="" />
          </div>
          <div>
            <label htmlFor="eventstart">Event Timing</label>
            <input value={eventTime} onChange={(e) => setEventTime(e.target.value)} type="datetime-local" name="eventstart" id="" />
          </div>
        </div>

        <div>
          <button type="button" onClick={() => {setTripEvents(te => [...te, {name: eventName, description: eventDescription, time: eventTime}]); clearEvent(); setAdding(false)}}>Add</button>
          <button type="button" onClick={() => setAdding(false)}>Close</button>
        </div>
      </div>
      }
    </form>
  )
}
