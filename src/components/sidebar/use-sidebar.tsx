
import { useState, useEffect } from "react";

export function useSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Load collapsed state from localStorage on initial render
  useEffect(() => {
    const storedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (storedCollapsed !== null) {
      setIsCollapsed(storedCollapsed === "true");
    }
  }, []);
  
  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed.toString());
  }, [isCollapsed]);
  
  return {
    hovered,
    setHovered,
    open,
    setOpen,
    isCollapsed,
    setIsCollapsed
  };
}
