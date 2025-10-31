import React from "react";
import { Switch } from '@/lib/ui/Switch';

export function ControlledSwitchExample() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <Switch
      variant="accent"
      isSelected={isSelected}
      onChange={setIsSelected}
    >
      {isSelected ? '(켜짐)' : '(꺼짐)'}
    </Switch>
  );
}
