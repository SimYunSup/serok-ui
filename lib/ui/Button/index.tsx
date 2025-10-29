/* type: registry:ui */
import { Button as SpButton } from "@react-spectrum/button";
import "./styles.css";

interface ButtonProps extends React.ComponentProps<typeof SpButton> {
  size?: 's' | 'm' | 'l' | 'xl';
}

export function Button(props: ButtonProps) {
  const { size, ...rest } = props;
  return (
    <SpButton
      UNSAFE_className={`serok-button serok-button--${size}`}
      {...rest}
    />
  );
}
