/* type: registry:ui */
import { Button as SpButton } from '@react-spectrum/button';
import './styles.css';

interface ButtonProps extends React.ComponentProps<typeof SpButton> {
  variant: 'primary' | 'secondary' | 'accent' | 'negative'
  size?: 's' | 'm' | 'l' | 'xl'
  href?: string
}

export function Button(props: ButtonProps) {
  const { size, variant, ...rest } = props;

  return (
    <SpButton
      UNSAFE_className={`serok-button serok-button--${size} ${variant === 'secondary' ? 'serok-button--secondary' : ''}`}
      variant={variant === 'secondary' ? 'primary' : variant}
      {...rest}
      data-size={size ?? 'M'}
      style={rest.style ?? 'fill'}
    />
  );
}
