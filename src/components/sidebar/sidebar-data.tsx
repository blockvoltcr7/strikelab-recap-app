
import {
  LayoutGrid,
  Settings,
  Calendar,
  Trophy,
  BookOpen,
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
      title: "Events",
      href: "/events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Rewards",
      href: "/rewards",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Classes",
      href: "/classes",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    }
  ];

  return items;
};
