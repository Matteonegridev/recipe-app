import { ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  id: string;
  name: string;
  label: string;
  error: string | undefined | null;
};

function Textarea({ id, name, label, error, ...rest }: TextareaProps) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="shadow-secondary-sandyBrown outline-secondary-sandyBrown mt-1 w-[35rem] rounded-md border border-none px-1 py-2 text-lg shadow-sm"
        id={id}
        name={name}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Textarea;
