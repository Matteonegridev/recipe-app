import { ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  id: string;
  name: string;
  label: string;
};

function Textarea({ id, name, label, ...rest }: TextareaProps) {
  return (
    <>
      <label htmlFor={name}> {label}</label>
      <textarea className="border" id={id} name={name} {...rest} />
    </>
  );
}

export default Textarea;
