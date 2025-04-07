import { Picker as SpPicker } from "@swc-react/picker";
import "./styles.css";

export function Select(props: React.ComponentProps<typeof SpPicker>) {
  return (
    <SpPicker
      {...props}
    />
  );
}
