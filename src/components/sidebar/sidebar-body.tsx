
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

interface SidebarBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarBody = ({ className, children }: SidebarBodyProps) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
};
