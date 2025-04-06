import { Button as SpButton } from "@swc-react/button";
import "./styles.css";

interface ButtonProps extends React.ComponentProps<typeof SpButton> { }

export function Button(props: ButtonProps) {
  return (
    <SpButton
      {...props}
    />
  );
}
