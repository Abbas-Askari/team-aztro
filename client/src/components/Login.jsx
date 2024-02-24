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
  } = useForm();

  if (user) {
    return <Navigate to="/" />;
  }

  console.log(errors);

  const submit = async (data) => {
    dispatch(loginAsync({...data, isAgent: data.isAgent === "true"}));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=""
    >
      <form
        method="POST"
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        className=""
      >
        <h2 className="">Login</h2>
        <label htmlFor="name">Username</label>
        <input
          className=""
          id="name"
          type="text"
          name="name"
          placeholder="Username"
          {...register("name")}
        />
        <div className="">
          {errors.find((error) => error.path == "name")?.message}
        </div>
        <label htmlFor="email">Email</label>
        <input
          className=""
          type="text"
          name="email"
          id="email"
          placeholder="Username"
          {...register("email")}
        />
        <div className="">
          {errors.find((error) => error.path == "email")?.message}
        </div>
        <label htmlFor="password">Password</label>
        <input
          id={"Password"}
          placeholder={"Password"}
          className=""
          name="password"
          {...register("password")}
        />
        <div className="">
          {errors.find((error) => error.path == "password")?.message}
        </div>        
        <button className="" type="submit" disabled={false}>
          Login
        </button>
      </form>
    </div>
  );
}
