import { useState } from "react";

import { SchemaValues } from "../schema/validateUser";
import { useAuthQuery } from "../hooks/useAuthQuery";
import Input from "../components/Input";

const Login = () => {
  const [data, setData] = useState<SchemaValues>({
    username: "",
    password: "",
  });

  const { login, setDisplayError, displayError, resetErrors } = useAuthQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if fields are empty, display error if hit the button and fields are empty. This code has been placed here because of the react query auth context, otherwise I would have place into the login function.
    const emptyFields =
      data.username.trim() === "" || data.password.trim() === "";

    if (emptyFields) {
      setDisplayError({
        username:
          data.username.trim() === "" ? "Username is required" : undefined,
        password:
          data.password.trim() === "" ? "Password is required" : undefined,
      });
      resetErrors(4000);
      return;
    }
    try {
      login(data);
      setData({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-25">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-10 px-10 py-20"
      >
        <h1 className="text-secondary-sandyBrown font-header text-6xl font-bold">
          Login
        </h1>
        <Input
          error={displayError.username}
          placeholder="Your login username"
          type="text"
          id="username"
          name="username"
          label="Username"
          value={displayError.username}
          onChange={handleChange}
        />
        <Input
          placeholder="Your password"
          error={displayError.password}
          type="password"
          id="password"
          name="password"
          label="Password"
          value={displayError.password}
          onChange={handleChange}
        />
        <button
          className="bg-primary-green w-[10rem] cursor-pointer rounded-lg py-2 text-lg font-bold text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
