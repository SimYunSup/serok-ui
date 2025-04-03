import React from "react";
import "./style.css";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div className="serok-root">
      {children}
    </div>
  );
}
