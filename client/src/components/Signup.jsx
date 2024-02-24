import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../authSlice";

export default function SignUp() {
  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    dispatch(signupAsync({...data, isAgent: data.isAgent === "true"}));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
    >
      <form
        method="POST"
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
      >
        <h2 >
          SignUp
        </h2>
        <label htmlFor="name">Username</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Username"
          {...register("name")}
        />
        <div>
          {errors.find((error) => error.path == "name")?.message}
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Username"
          {...register("email")}
        />
        <div>
          {errors.find((error) => error.path == "email")?.message}
        </div>
        <label htmlFor="password">Password</label>
        <input
          id={"Password"}
          placeholder={"Password"}
          name="password"
          {...register("password")}
        />
        <div>
          {errors.find((error) => error.path == "password")?.message}
        </div>
        <div>
          <label htmlFor="">
            Account type
          </label>
          <div>
            <label htmlFor="agent">Agent</label>
            <input
              id="agent"
              placeholder={"Password"}
              name="isAgent"
              value={true}
              type="radio"
              {...register("isAgent")}
            />
          </div>
          <div>
            <label htmlFor="user">User</label>
            <input
              id="user"
              placeholder={"Password"}
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
        <button type="submit" disabled={false}>
          SignUp
        </button>
      </form>
    </div>
  );
}
