
import {
  LayoutDashboard,
  Library,
  Upload,
  Settings,
  Video,
} from "lucide-react";

interface SidebarItem {
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
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Video Library",
      href: "/videos",
      icon: <Library className="h-5 w-5" />,
      submenu: [
        {
          title: "Boxing",
          href: "/videos/boxing",
          icon: <Video className="h-5 w-5" />,
        },
        {
          title: "Muay Thai",
          href: "/videos/muay-thai",
          icon: <Video className="h-5 w-5" />,
        },
        {
          title: "Sparring",
          href: "/videos/sparring",
          icon: <Video className="h-5 w-5" />,
        },
        {
          title: "Junior Champs",
          href: "/videos/junior-champs",
          icon: <Video className="h-5 w-5" />,
        },
      ],
    }
  ];

  // Add admin/coach only items
  if (userRole === 'admin' || userRole === 'coach') {
    items.push({
      title: "Video Management",
      href: "/admin/videos/upload",
      icon: <Upload className="h-5 w-5" />,
      requiredRole: ['admin', 'coach'],
    });
  }

  items.push({
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  });

  return items;
};
