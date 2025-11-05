/* type: registry:ui */
import { Tabs as SpTabs } from "@react-spectrum/tabs";
import type React from "react";
import "./styles.css";

interface TabsProps extends Omit<React.ComponentProps<typeof SpTabs>, "orientation" | "density"> {
  variant?: "default" | "compact" | "emphasized";
}

export function Tabs({
  children,
  ...props
}: TabsProps) {
  return (
    <SpTabs
      {...props}
      UNSAFE_className="serok-tabs"
    >
      {children}
    </SpTabs>
  );
}

// Re-export sub-components
export { TabList, TabPanels, Item as TabItem } from "@react-spectrum/tabs";
