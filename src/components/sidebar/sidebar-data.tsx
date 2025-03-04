import {
  IconApi,
  IconArrowLeft,
  IconBrandTabler,
  IconChecklist,
  IconHome,
  IconMessagePlus,
  IconRotate,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

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
      <IconHome className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <IconUserBolt className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "History",
    href: "/history",
    icon: (
      <IconArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

// Secondary navigation links shown below the divider
export const secondaryLinks: SidebarLinkType[] = [
  {
    label: "Documentation",
    href: "/docs",
    icon: (
      <IconChecklist className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "API reference",
    href: "/api",
    icon: (
      <IconApi className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Support",
    href: "/support",
    icon: (
      <IconMessagePlus className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Updates",
    href: "/updates",
    icon: (
      <IconRotate className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

// For backward compatibility, keep SIDEBAR_ITEMS export
export const SIDEBAR_ITEMS: SidebarLinkType[] = [...primaryLinks, ...secondaryLinks];
