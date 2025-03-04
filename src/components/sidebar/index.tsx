
import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { Logo } from "./logo";
import SidebarLink from "./sidebar-link";
import { IconUserBolt } from "@tabler/icons-react";
import { ReactNode } from "react";

interface SidebarLayoutProps {
  className?: string;
  children: ReactNode;
}

interface SidebarProps {
  children: ReactNode;
}

interface SidebarBodyWrapperProps {
  children: ReactNode;
  className?: string;
}

export const SidebarLayout = ({
  className,
  children,
}: SidebarLayoutProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md border border-border bg-background dark:border-sidebar-border md:flex-row",
        className,
      )}
    >
      <Sidebar>
        <SidebarBody />
      </Sidebar>

      {children}
    </div>
  );
};

export const Sidebar = ({ children }: SidebarProps) => {
  return <>{children}</>;
};

const SidebarBodyWrapper = ({ children, className }: SidebarBodyWrapperProps) => {
  return <div className={className}>{children}</div>;
};

export { Logo, LogoIcon } from "./logo";
export { SidebarBody } from "./sidebar-body";
export { DesktopSidebar } from "./desktop-sidebar";
export { MobileSidebar } from "./mobile-sidebar";
