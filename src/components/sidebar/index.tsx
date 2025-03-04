
import { cn } from "@/lib/utils";
import SidebarBody from "./sidebar-body";
import { Logo, LogoIcon } from "./logo";
import SidebarLink from "./sidebar-link";
import { User } from "lucide-react";
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
        "mx-auto flex w-full h-screen flex-1 overflow-hidden bg-background",
        className,
      )}
    >
      <Sidebar>
        <DesktopSidebar isCollapsed={isCollapsed}>
          <SidebarBodyWrapper className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <div className="flex items-center">
                {isCollapsed ? <LogoIcon /> : <Logo />}
              </div>
              <SidebarBody />
            </div>
          </SidebarBodyWrapper>
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
          "flex-1 transition-all duration-300 ease-in-out h-screen overflow-y-auto",
          isCollapsed ? "ml-16 pl-0" : "ml-[220px] pl-0",
        )}
      >
        <div className="w-full h-full">
          {children}
        </div>
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
