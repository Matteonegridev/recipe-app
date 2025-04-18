import { ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  id: string;
  name: string;
  label: string;
};

function Textarea({ id, name, label, ...rest }: TextareaProps) {
  return (
    <>
      <label className="text-lg" htmlFor={name}>
        {" "}
        {label}
      </label>
      <textarea
        className="mt-1 w-full rounded-md border px-1 py-2"
        id={id}
        name={name}
        {...rest}
      />
    </>
  );
}

export default Textarea;
