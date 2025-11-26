/* type: registry:ui
 * registryDependenies: ["menu"]
 */
import { Picker as SpPicker } from '@react-spectrum/picker';
import './styles.css';

export function Select(props: React.ComponentProps<typeof SpPicker>) {
  return (
    <SpPicker
      UNSAFE_className="serok-select"
      {...props}
    />
  );
}

export { Item as SelectItem } from '@react-spectrum/picker';
