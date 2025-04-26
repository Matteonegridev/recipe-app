import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  label: string;

  className: string;
};

function Button({ label, className, onClick }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
