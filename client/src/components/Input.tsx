import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  type: string;
  id: string;
  name: string;
  label: string;
};

function Input({ type, id, name, label, ...rest }: InputProps) {
  return (
    <>
      <label className="text-lg" htmlFor={name}>
        {label}
      </label>
      <input
        className="mt-1 w-full rounded-md border px-1 py-2"
        type={type}
        id={id}
        name={name}
        {...rest}
      />
    </>
  );
}

export default Input;
