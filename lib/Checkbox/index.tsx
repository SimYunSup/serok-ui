import { Checkbox as SpCheckbox } from "@swc-react/checkbox";
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
      emphasized={variant !== "default"}
      data-variant={variant}
    />
  );
}
