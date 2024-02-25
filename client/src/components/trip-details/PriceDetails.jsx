import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PriceDetails = ({ trip }) => {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([
    {
      name: "Allow to bring pets",
      price: 10,
    },
  ]);
  const navigate = useNavigate();

  const extras = [
    {
      name: "Allow to bring pets",
      price: 10,
    },
    {
      name: "Breakfast",
      price: 15,
    },
    {
      name: "Parking",
      price: 3,
    },
    {
      name: "Extra Pillow",
      price: 1,
    },
  ];

  const featuresPrice = features.reduce((acc, { price }) => acc + price, 0);
  const total = trip.price + featuresPrice;

  function submit() {
    setLoading(true);
    fetch(
      import.meta.env.VITE_BACKEND +
        "/trips/trip/" +
        trip._id.toString() +
        "/bookings",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extras: features }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        navigate("/bookings");
      })
      .catch(() => setLoading(false));
  }

  return (
    <div className="rounded-lg bg-white border dark:bg-card-dark dark:border-dark p-4">
      <div className="flex-center-between pb-2 border-b dark:border-b-dark">
        <h1>
          <span className="text-4xl md:text-5xl font-bold">$142</span>{" "}
          <span className="opacity-80 text-sm">/night</span>{" "}
          <span className="line-through opacity-80 text-sm">$182</span>
        </h1>
        <div className="flex-shrink-0">
          <span className="px-1 py-[2px] text-sm text-white bg-primary rounded-full">
            20% OFF
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h1 className="font-semibold">Extra Features</h1>
        <div className="mt-2">
          {extras.length > 0 &&
            extras.map((ext) => (
              <div className="flex-center-between mt-2">
                <div className="input-check">
                  <input
                    // checked={features.some((f) => f.name === ext.name)}
                    type="checkbox"
                    id={ext.name}
                    onChange={(e) => {
                      console.log("Checked: ", e.target.checked);
                      console.log(features, ext);
                      if (e.target.checked) {
                        setFeatures((f) => [...f, { ...ext }]);
                      } else {
                        setFeatures((f) =>
                          f.filter((fe) => fe.name !== ext.name)
                        );
                      }
                    }}
                  />
                  <label htmlFor={ext.name}>{ext.name}</label>
                </div>
                <p>${ext.price}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-3">
        <h1 className="font-semibold">Price</h1>
        <div className="rounded-lg p-3 bg-slate-100 dark:bg-hover-color-dark">
          <div className="flex-center-between">
            <h1>Base Price</h1>
            <p>${trip.price}</p>
          </div>
          <div className="flex-center-between mt-2">
            <h1>Extra Features</h1>
            <p>${featuresPrice}</p>
          </div>
        </div>
        <div className="flex-center-between mt-5">
          <h1>Total Payment</h1>
          <h1 className="text-xl font-bold">${total}</h1>
        </div>
        {/* <Link
          to="/hotels/1/confirm-booking"
          className="btn btn-primary block text-center w-full mt-4 !opacity-100"
        >
          book now
        </Link> */}
        <button
          disabled={loading}
          onClick={submit}
          className="btn btn-primary block text-center w-full mt-4 !opacity-100 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          book now
        </button>
      </div>
    </div>
  );
};

export default PriceDetails;
