
import { useState } from "react";

export function useSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  
  return {
    hovered,
    setHovered,
    open,
    setOpen
  };
}
