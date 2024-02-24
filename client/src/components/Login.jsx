import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  console.log(errors);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    // formState: { errors },
  } = useForm();

  if (user) {
    return <Navigate to="/" />;
  }

  console.log(errors);

  //   useEffect(() => {
  //     console.log(errors);
  //   }, [errors]);

  const submit = async (data) => {
    console.log("asdadasdasd", data);
    data.isAgent = data.isAgent === "true" ? true : false;
    dispatch(loginAsync(data));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center p-5 gap-5"
    >
      <form
        method="POST"
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        className="card flex flex-col gap-4 bg-base-200 p-4"
      >
        <h2 className=" font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400">
          Login
        </h2>
        <label htmlFor="name">Username</label>
        <input
          className=" input input-md"
          id="name"
          type="text"
          name="name"
          placeholder="Username"
          {...register("name")}
        />
        <div className="text-error text-sm">
          {errors.find((error) => error.path == "name")?.message}
        </div>
        <label htmlFor="email">Email</label>
        <input
          className="input "
          type="text"
          name="email"
          id="email"
          placeholder="Username"
          {...register("email")}
        />
        <div className="text-error text-sm">
          {errors.find((error) => error.path == "email")?.message}
        </div>
        <label htmlFor="password">Password</label>
        <input
          id={"Password"}
          placeholder={"Password"}
          className="input input-md"
          name="password"
          {...register("password")}
        />
        <div className="text-error text-sm">
          {errors.find((error) => error.path == "password")?.message}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold">
            Account type
          </label>
          <div className="flex justify-between">
            <label htmlFor="agent">Agent</label>
            <input
              id="agent"
              placeholder={"Password"}
              className="radio radio-sm radio-primary"
              name="isAgent"
              value={true}
              type="radio"
              {...register("isAgent")}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="user">User</label>
            <input
              id="user"
              placeholder={"Password"}
              className="radio radio-sm radio-primary"
              name="isAgent"
              value={false}
              type="radio"
              {...register("isAgent")}
            />
          </div>
          <div className="text-error text-sm">
            {errors.find((error) => error.path == "isAgent")?.message}
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={false}>
          Login
        </button>
        {errors && (
          <div className="errors">
            {/* {errors.filter(
              (e) =>
                !["name", "email", "password"]
                  .includes(e.path)[0]
                  ?.message.toString()
            )} */}
          </div>
        )}
      </form>
    </div>
  );
}
