import {
  Home,
  Video,
  Lightbulb,
  ScrollText,
  Settings,
  LifeBuoy,
  Bell,
  User,
  MoreHorizontal
} from "lucide-react";

export interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
  mobileVisible?: boolean;
}

// Primary navigation links shown at the top of the sidebar
export const primaryLinks: SidebarLinkType[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <Home className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: true
  },
  {
    label: "Video Library",
    href: "/videos",
    icon: (
      <Video className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: true
  },
  {
    label: "Wisdom & Quotes",
    href: "/wisdom",
    icon: (
      <Lightbulb className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: true
  },
  {
    label: "History Lessons",
    href: "/history",
    icon: (
      <ScrollText className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: true
  },
];

// Secondary navigation links shown below the divider
export const secondaryLinks: SidebarLinkType[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: false
  },
  {
    label: "Support",
    href: "/support",
    icon: (
      <LifeBuoy className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: false
  },
  {
    label: "Updates",
    href: "/updates",
    icon: (
      <Bell className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    mobileVisible: false
  },
];

// More menu for mobile
export const moreMenuLink: SidebarLinkType = {
  label: "More",
  href: "#more",
  icon: (
    <MoreHorizontal className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
  ),
  mobileVisible: true
};

// For backward compatibility, keep SIDEBAR_ITEMS export
export const SIDEBAR_ITEMS: SidebarLinkType[] = [...primaryLinks, ...secondaryLinks];
