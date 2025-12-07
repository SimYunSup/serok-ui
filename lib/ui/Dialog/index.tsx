/* type: registry:ui */
import { AlertDialog as SpAlertDialog, DialogTrigger } from '@react-spectrum/dialog';
import type React from 'react';
import './styles.css';

interface AlertDialogProps extends React.ComponentProps<typeof SpAlertDialog> {}

export function AlertDialog(props: AlertDialogProps) {
  return <SpAlertDialog UNSAFE_className="serok-dialog" {...props} />;
}

export { DialogTrigger } from '@react-spectrum/dialog';
