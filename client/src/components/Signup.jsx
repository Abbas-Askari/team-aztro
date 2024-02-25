import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import ImgScr from "./signup4.jpg";

export default function Signup() {
  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(errors);
  const { register, handleSubmit } = useForm();

  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/" />;
  }

  console.log(errors);

  const submit = async (data) => {
    dispatch(signupAsync({ ...data, isAgent: data.isAgent === "true" }));
  };

  return (
    <div className="flex">
      <div className="flex-1 h-screen w-1/2">
        <img className="h-screen w-2xl" src={ImgScr} alt="" />
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        className="flex-1 min-h-screen flex-center-center pt-20 bg-gray-100"
      >
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">SignUp</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Username"
              {...register("name")}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="text-red-500 text-sm">{errors.find((error) => error.path === "name")?.message}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="text-red-500 text-sm">{errors.find((error) => error.path === "email")?.message}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              {...register("password")}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="text-red-500 text-sm">{errors.find((error) => error.path === "password")?.message}</div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account type</label>
            <div>
              <input
                id="agent"
                name="isAgent"
                value="true"
                type="radio"
                {...register("isAgent")}
                className="mr-2"
              />
              <label htmlFor="agent" className="text-sm font-medium text-gray-700">
                Agent
              </label>
            </div>
            <div>
              <input
                id="user"
                name="isAgent"
                value="false"
                type="radio"
                {...register("isAgent")}
                className="mr-2"
              />
              <label htmlFor="user" className="text-sm font-medium text-gray-700">
                User
              </label>
            </div>
            <div className="text-red-500 text-sm">
              {errors.find((error) => error.path === "isAgent")?.message}
            </div>
          </div>
          <button
            type="submit"
            disabled={false}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}
