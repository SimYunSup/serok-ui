import { Switch as SpSwitch } from "@swc-react/switch";
import "./styles.css";

interface SwitchProps extends Omit<React.ComponentProps<typeof SpSwitch>, "emphasized"> {
  variant: "default" | "accent" | "secondary";
}

export function Switch({
  variant,
  ...props
}: SwitchProps) {
  return (
    <SpSwitch
      {...props}
      emphasized={variant !== "default"}
      data-variant={variant}
    />
  );
}
