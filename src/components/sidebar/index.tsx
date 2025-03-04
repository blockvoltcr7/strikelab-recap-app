
import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { Logo } from "./logo";
import SidebarLink from "./sidebar-link";
import { primaryLinks, secondaryLinks } from "./sidebar-data";
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
        <SidebarBodyWrapper className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col">
              {primaryLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} id={`primary-link-${idx}`} />
              ))}
            </div>
            <div className="mt-4">
              <div className="h-px w-full bg-sidebar-border"></div>
              <div className="h-px w-full bg-sidebar"></div>
            </div>
            <div className="mt-4 flex flex-col">
              {secondaryLinks.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  id={`secondary-link-${idx}`}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User Profile",
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-sidebar-accent dark:bg-sidebar-accent flex items-center justify-center">
                    <IconUserBolt className="h-4 w-4 text-sidebar-accent-foreground" />
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBodyWrapper>
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
