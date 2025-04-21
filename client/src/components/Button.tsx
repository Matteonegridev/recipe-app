import { ComponentProps } from "react";
import { useNavigate } from "react-router";

type Props = ComponentProps<"button"> & {
  label: string;
  navTo: string;
  className: string;
};

function Button({ label, navTo, className }: Props) {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => navigate(navTo)}>
      {label}
    </button>
  );
}

export default Button;
