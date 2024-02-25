/* eslint-disable jsx-a11y/anchor-has-content */
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginAsync } from "../authSlice";
import { useForm } from "react-hook-form";
import ImgSrc from "../components/login7.jpg"

const Login = () => {

  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
  } = useForm();

  if (user) {
    return <Navigate to="/" />;
  }

  const submit = async (data) => {
    console.log(data)
    dispatch(loginAsync({...data, isAgent: data.isAgent === "true"}));
  };


  return (
    <div className="flex">
        
    <form method="POST" onSubmit={handleSubmit(submit)} autoComplete="off" className="min-h-screen flex-center-center pt-20 bg-gray-100 flex-1">
      <div className="max-w-[450px] w-[95%] mx-auto">
        <h1 className="heading">let's get started</h1>
        <div className="mt-3">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary hover:underline !opacity-100"
          >
            {" "}
            Sign up
          </Link>
        </div>
        <div className="mt-4">
          <div className="mt-4 bg-white border rounded-lg p-4 dark:bg-card-dark dark:border-dark">
            <label htmlFor="email" className="text-muted">
              Email
            </label>
            <div className="my-3">
              <input
                type="text"
                name="email"
                className="px-4 py-2 w-full rounded-md outline-none bg-transparent border dark:border-dark"
                placeholder="johndoe@gmail.com"
                {...register("email")}
                />
                <div>{errors.find((error) => error.path == "email")?.message}</div>
            </div>
            <label htmlFor="password" className="text-muted">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                className="px-4 py-2 w-full rounded-md outline-none bg-transparent border dark:border-dark"
                placeholder="Password"
                {...register("password")}
                name="password"
                />
                <div>{errors.find((error) => error.path == "password")?.message}</div>
            </div>
          </div>
          <div className="mt-4 flex-center-between">
            <div className="input-check">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary w-full">sign in</button>
          </div>
        </div>
      </div>
    </form>
    <div className="flex-1 h-screen">
        <img className="h-screen " src={ImgSrc} alt="" />
      </div>
    </div>

  );
};

export default Login;
