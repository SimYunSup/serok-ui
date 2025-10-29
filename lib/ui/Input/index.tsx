/* type: registry:ui */
import { TextField as SpTextField } from "@react-spectrum/textfield";

interface InputProps extends React.ComponentProps<typeof SpTextField> { }

export function Input(props: InputProps) {
  return (
    <SpTextField
      {...props}
    />
  );
}
