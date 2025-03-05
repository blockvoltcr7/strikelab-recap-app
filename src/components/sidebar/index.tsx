
import { cn } from "@/lib/utils";
import SidebarBody from "./sidebar-body";
import { Logo, LogoIcon } from "./logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { useSidebar } from "./use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopSidebar } from "./desktop-sidebar";

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
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 overflow-hidden bg-background",
        className,
      )}
    >
      <Sidebar>
        <DesktopSidebar isCollapsed={isCollapsed}>
          <SidebarBodyWrapper className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-center py-2 mb-2">
                {isCollapsed ? <LogoIcon /> : <Logo />}
              </div>
              <SidebarBody />
            </div>
          </SidebarBodyWrapper>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-2.5 top-4 z-30 h-5 w-5 rounded-full border border-sidebar-border bg-sidebar shadow-md"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-2.5 w-2.5" />
            ) : (
              <ChevronLeft className="h-2.5 w-2.5" />
            )}
          </Button>
        </DesktopSidebar>
      </Sidebar>

      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out h-screen overflow-auto",
          isCollapsed ? "ml-12" : "ml-[180px]",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const Sidebar = ({ children }: SidebarProps) => {
  return <>{children}</>;
};

const SidebarBodyWrapper = ({ children, className }: SidebarBodyWrapperProps) => {
  return <div className={cn("flex flex-col h-full", className)}>{children}</div>;
};

export { Logo, LogoIcon } from "./logo";
export { default as SidebarBody } from "./sidebar-body";
export { DesktopSidebar } from "./desktop-sidebar";
export { MobileSidebar } from "./mobile-sidebar";
