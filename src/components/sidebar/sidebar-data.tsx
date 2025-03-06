
import {
  LayoutGrid,
  Settings,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: JSX.Element;
  submenu?: Omit<SidebarItem, "submenu">[];
  requiredRole?: string[];
}

export const getSidebarItems = (userRole?: string): SidebarItem[] => {
  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    }
  ];

  return items;
};
