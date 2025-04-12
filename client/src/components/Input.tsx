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
      <label htmlFor={name}> {label}</label>
      <input className="border" type={type} id={id} name={name} {...rest} />
    </>
  );
}

export default Input;
