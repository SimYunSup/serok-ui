/* type: registry:ui */
import { Tabs as SpTabs, TabList, TabPanels, Item } from "@react-spectrum/tabs";
import type React from "react";
import "./styles.css";

interface TabsProps extends Omit<React.ComponentProps<typeof SpTabs>, "orientation" | "density"> {
  variant?: "default" | "compact" | "emphasized";
  orientation?: "horizontal" | "vertical";
  density?: "compact" | "regular";
}

export function Tabs({
  variant = "default",
  orientation = "horizontal",
  density = "regular",
  children,
  ...props
}: TabsProps) {
  return (
    <SpTabs
      {...props}
      orientation={orientation}
      density={density}
      UNSAFE_className={`serok-tabs serok-tabs--${variant}`}
      data-variant={variant}
    >
      {children}
    </SpTabs>
  );
}

// Re-export sub-components
export { TabList, TabPanels, Item };
