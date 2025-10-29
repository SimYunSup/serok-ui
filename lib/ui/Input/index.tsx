/* type: registry:ui */
import { TextField as SpTextField } from "@react-spectrum/textfield";
import "./styles.css";

interface InputProps extends React.ComponentProps<typeof SpTextField> { }

export function Input(props: InputProps) {
  return (
    <SpTextField
      UNSAFE_className="serok-input"
      {...props}
    />
  );
}
