
import { cn } from "../../lib/cn";
import { SidebarBody } from "./sidebar-body";
import { Logo } from "./logo";
import SidebarLink from "./sidebar-link";
import { primaryLinks, secondaryLinks } from "./sidebar-data";
import { IconUserBolt } from "@tabler/icons-react";

export const SidebarLayout = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 md:flex-row",
        className,
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col">
              {primaryLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} id={`primary-link-${idx}`} />
              ))}
            </div>
            <div className="mt-4">
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-px w-full bg-white dark:bg-neutral-900"></div>
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
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                    <IconUserBolt className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Logo, LogoIcon } from "./logo";
export { SidebarBody } from "./sidebar-body";
export { DesktopSidebar } from "./desktop-sidebar";
export { MobileSidebar } from "./mobile-sidebar";
