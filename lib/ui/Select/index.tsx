/* type: registry:ui
 * registryDependenies: ["menu"]
 */
import { Picker as SpPicker, Item as SpItem } from "@react-spectrum/picker";
import "./styles.css";

export function Select(props: React.ComponentProps<typeof SpPicker>) {
  return (
    <SpPicker
      {...props}
    />
  );
}

export const Item = SpItem;
