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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <Input
            type="text"
            id="username"
            name="username"
            label="username"
            value={data.username}
            onChange={handleChange}
          />
          {displayError.username && (
            <p className="text-xs text-red-500">{displayError.username}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            value={data.password}
            onChange={handleChange}
          />
          {displayError.password && (
            <p className="text-xs text-red-500">{displayError.password}</p>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
