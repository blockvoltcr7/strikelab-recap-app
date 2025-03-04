
import {
  IconApi,
  IconArrowLeft,
  IconBrandTabler,
  IconChecklist,
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

export const SIDEBAR_ITEMS: SidebarLinkType[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
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
