import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  type: string;
  id: string;
  name: string;
  label: string;
  error: string | null | undefined | string[];
};

function Input({ type, id, name, label, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className="outline-secondary-sandyBrown shadow-secondary-sandyBrown w-[35rem] rounded-md border-none px-2 py-3 text-lg shadow-sm"
        type={type}
        id={id}
        name={name}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
