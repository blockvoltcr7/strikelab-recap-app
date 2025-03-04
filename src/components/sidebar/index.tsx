
import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { Logo, LogoIcon } from "./logo";
import SidebarLink from "./sidebar-link";
import { primaryLinks, secondaryLinks } from "./sidebar-data";
import { IconUserBolt } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
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
  const { signOut } = useAuth();
  const { toast } = useToast();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
      });
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md border border-border bg-background dark:border-sidebar-border",
        className,
      )}
    >
      <Sidebar>
        <DesktopSidebar isCollapsed={isCollapsed}>
          <SidebarBodyWrapper className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {isCollapsed ? <LogoIcon /> : <Logo />}
              <div className="mt-8 flex flex-col">
                {primaryLinks.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link} 
                    id={`primary-link-${idx}`} 
                    isCollapsed={isCollapsed}
                  />
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
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2">
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
                isCollapsed={isCollapsed}
              />
              
              {/* Logout button with matching styling */}
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "default"}
                onClick={handleLogout}
                className="w-full justify-start px-2 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="h-5 w-5 mr-3 text-neutral-700 dark:text-neutral-200" />
                {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
              </Button>
            </div>
          </SidebarBodyWrapper>
          
          {/* Collapse toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-3 top-4 z-30 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar shadow-md"
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        </DesktopSidebar>
      </Sidebar>

      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-[280px]"
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
export { SidebarBody } from "./sidebar-body";
export { DesktopSidebar } from "./desktop-sidebar";
export { MobileSidebar } from "./mobile-sidebar";
