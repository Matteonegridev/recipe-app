import { ComponentProps } from "react";
import clsx from "clsx";

type ButtonProps = ComponentProps<"button"> & {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

function Button({
  label,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-secondary-accent-1 text-black",
    secondary: "border border-secondary-accent-1 text-white",
  };

  return (
    <button {...props} className={clsx(variantStyles[variant], className)}>
      {label}
    </button>
  );
}

export default Button;
