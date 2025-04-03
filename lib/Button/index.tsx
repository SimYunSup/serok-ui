import type { ButtonTreatments, ButtonVariants } from "@spectrum-web-components/button";

import "@spectrum-web-components/button/sp-button.js";
import "./styles.css";

interface ButtonProps {
  variant?: ButtonVariants;
  size: ElementSize;
  treatment?: ButtonTreatments;
  disabled?: boolean;
  pending?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export function Button({
  children,
  variant,
  size,
  treatment,
  disabled,
  pending,
  onClick,
}: ButtonProps) {
  return (
    <sp-button
      variant={variant}
      size={size}
      treatment={treatment}
      disabled={disabled}
      pending={pending}
      onClick={onClick}
    >
      {children}
    </sp-button>
  );
}
