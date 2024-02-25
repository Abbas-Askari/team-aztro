import { useEffect, useState } from "react";
import { BiEnvelope, BiPhone, BiUser } from "react-icons/bi";
import { FiCalendar, FiHome } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsync } from "../../authSlice";

const defaultuser = {
  name: "Name Here",
  location: "Location Here",
  email: "Email Here",
  dob: new Date("2024-02-24T23:41:56.850Z"),
  gender: "Not Selected",
  phone: "Phone Number Here"
}

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const { user: stateUser } = useSelector(state => state.auth)
  const [user, setUser] = useState({...defaultuser, ...stateUser});
  const defaultDate = new Date(user.dob ? user.dob : defaultuser.dob).toISOString().substr(0, 10)
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setUser(stateUser)
  }, [stateUser])

  return (
    <div className="mt-8">
      <div className="flex-center-between">
        <h1 className="heading">Hi, I'm {user.name}</h1>
        <button onClick={() => dispatch(editUserAsync({user}))} className="px-3 rounded-full bg-slate-200 dark:bg-dark-light py-1">
          Save Profile
        </button>
      </div>
      <div className="flex-align-center flex-col sm:flex-row gap-4 mt-4">
        <div className="flex-1 w-full sm:w-fit">
          <p>Lives in</p>
          <div className="mt-2 flex-align-center px-3 py-2 gap-2 border dark:border-dark rounded-md">
            <FiHome />
            <input
              type="text"
              className="border-none outline-none bg-transparent w-full focus:border-primary"
              value={user.location}
              name="location"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex-1 w-full sm:w-fit">
          <p>Phone Number</p>
          <div className="mt-2 flex-align-center px-3 py-2 gap-2 border dark:border-dark rounded-md">
            <BiPhone />
            <input
              type="text"
              className="border-none outline-none bg-transparent w-full"
              value={user.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p>Email Address</p>
        <div className="mt-2 flex-align-center px-3 py-2 gap-2 border dark:border-dark rounded-md">
          <BiEnvelope />
          <input
            type="text"
            className="border-none outline-none bg-transparent w-full"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex-align-center flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1 w-full sm:w-fit">
            <p>Born on</p>
            <div className="mt-2 flex-align-center px-3 py-2 gap-2 border dark:border-dark rounded-md">
              <FiCalendar />
              <input
                type="date"
                className="border-none outline-none bg-transparent w-full"
                value={defaultDate}
                name="dob"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-1 w-full sm:w-fit">
            <p>Gender</p>
            <div className="mt-2 flex-align-center px-3 py-2 gap-2 border dark:border-dark rounded-md ">
              <BiUser />
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="border-none outline-none w-full bg-inherit dark:bg-main-dark"
              >
                {user.gender === "Not Selected" && <option value={"Not Selected"} selected>Not Selected</option>}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
