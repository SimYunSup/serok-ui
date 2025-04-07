import { Textfield as SpTextfield } from "@swc-react/textfield";

interface InputProps extends React.ComponentProps<typeof SpTextfield> { }

export function Input(props: InputProps) {
  return (
    <SpTextfield
      {...props}
    />
  );
}
