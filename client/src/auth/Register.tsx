import { useState } from "react";
import { SchemaValues } from "../schema/validateUser";
import userValidation from "../schema/validateUser";
import { useAuthQuery } from "../hooks/useAuthQuery";
import Input from "../components/Input";

const Register: React.FC = () => {
  const [data, setData] = useState<SchemaValues>({
    username: "",
    password: "",
  });

  // Utilizziamo field errors a parte perche sono gli errori che provendono da zod schema.
  const [fieldError, setFieldError] = useState<{
    username?: string;
    password?: string;
  }>({});

  const { register } = useAuthQuery();

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

    try {
      // safeparse data con lo schema di zod in considerazione:
      const result = userValidation.safeParse(data);
      console.log("result", result);
      if (result.success) {
        register(data);
      } else {
        // flatten è utilizzato per appiattire l'array
        const flattenData = result.error.flatten();
        console.log(flattenData);
        setFieldError((prev) => ({
          ...prev,
          username: flattenData.fieldErrors?.username?.[0],
          password: flattenData.fieldErrors?.password?.[0],
        }));
      }
    } catch (error) {
      console.error(error);
    }
    console.log("submitted:", data);
    // clear inputs
    setData({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <Input
            label="What should we call you?"
            type="text"
            id="register-username"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="type your username"
          />
          {fieldError.username && (
            <p className="text-xs text-red-500">{fieldError.username}</p>
          )}
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            id="register-password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Type your strongest password"
          />
          {fieldError.password && (
            <p className="text-xs text-red-500">{fieldError.password}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
