/* type: registry:ui */
import { Checkbox as SpCheckbox } from "@react-spectrum/checkbox";
import "./styles.css";

interface CheckboxProps extends Omit<React.ComponentProps<typeof SpCheckbox>, "emphasized"> {
  variant: "default" | "accent" | "secondary";
}

export function Checkbox({
  variant,
  ...props
}: CheckboxProps) {
  return (
    <SpCheckbox
      {...props}
      isEmphasized={variant !== "default"}
      data-variant={variant}
    />
  );
}
