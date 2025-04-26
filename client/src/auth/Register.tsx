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
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-xl grow flex-col items-center space-y-10 max-sm:px-8"
      >
        <h1 className="font-header text-secondary-sandyBrown text-6xl font-bold">
          Register
        </h1>

        <Input
          error={fieldError.username}
          label="What should we call you?"
          type="text"
          id="register-username"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="type your username"
        />

        <Input
          error={fieldError.password}
          label="Password"
          type="password"
          id="register-password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Type your strongest password"
        />

        <button
          className="bg-primary-green w-[10rem] cursor-pointer rounded-lg py-2 text-lg font-bold text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
