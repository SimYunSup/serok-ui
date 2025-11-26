/* type: registry:ui */
import { Switch as SpSwitch } from '@react-spectrum/switch';
import './styles.css';

interface SwitchProps extends Omit<React.ComponentProps<typeof SpSwitch>, 'isEmphasized'> {
  variant: 'default' | 'accent' | 'secondary'
}

export function Switch({
  variant,
  ...props
}: SwitchProps) {
  return (
    <SpSwitch
      {...props}
      isEmphasized={variant !== 'default'}
      data-variant={variant}
    />
  );
}
