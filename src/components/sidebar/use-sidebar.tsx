
import { useState, useEffect } from "react";

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
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
    isCollapsed,
    setIsCollapsed,
    toggleSidebar: () => setIsCollapsed(prev => !prev)
  };
}
