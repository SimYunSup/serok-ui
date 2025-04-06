import { Checkbox as SpCheckbox } from "@swc-react/checkbox";
import "./styles.css";

interface CheckboxProps extends React.ComponentProps<typeof SpCheckbox> {
  variant: "default" | "accent" | "secondary";
}

export function Checkbox(props: CheckboxProps) {
  return (
    <SpCheckbox
      {...props}
      emphasized={props.variant !== "default"}
      data-variant={props.variant}
    />
  );
}
