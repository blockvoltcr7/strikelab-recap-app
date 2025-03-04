import {
  Home,
  Video,
} from "lucide-react";

export interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Primary navigation links shown at the top of the sidebar
export const primaryLinks: SidebarLinkType[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <Home className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Video Library",
    href: "/videos",
    icon: (
      <Video className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

// Secondary navigation links shown below the divider
export const secondaryLinks: SidebarLinkType[] = [];

// For backward compatibility, keep SIDEBAR_ITEMS export
export const SIDEBAR_ITEMS: SidebarLinkType[] = [...primaryLinks, ...secondaryLinks];
