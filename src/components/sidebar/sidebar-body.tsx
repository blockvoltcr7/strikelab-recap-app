
import { useSidebar } from "./use-sidebar";
import { primaryLinks, secondaryLinks } from "./sidebar-data";
import SidebarLink from "./sidebar-link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface SidebarBodyProps {
  className?: string;
}

export const SidebarBody = ({ className }: SidebarBodyProps) => {
  const { isCollapsed } = useSidebar();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

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

  return (
    <div className={`flex h-full flex-1 flex-col justify-between overflow-hidden ${className}`}>
      <div className="flex-1 overflow-auto px-3 py-2">
        {/* User info */}
        {user && (
          <div className="mb-4 flex items-center space-x-2 rounded-lg bg-sidebar-accent p-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium">{user.email}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Primary navigation items */}
        <nav className="flex flex-col gap-1">
          {primaryLinks.map((item) => (
            <SidebarLink 
              key={item.href} 
              link={item} 
              id={`sidebar-link-${item.href}`} 
            />
          ))}
          
          {/* Divider */}
          <div className="my-2">
            <div className="h-px w-full bg-sidebar-border"></div>
          </div>
          
          {/* Secondary navigation items */}
          {secondaryLinks.map((item) => (
            <SidebarLink 
              key={item.href} 
              link={item} 
              id={`sidebar-link-${item.href}`} 
            />
          ))}
        </nav>
      </div>
      
      {/* Sign out button - updated styling */}
      <div className="px-3 pb-3">
        <Button
          variant="outline"
          size={isCollapsed ? "icon" : "default"}
          onClick={handleLogout}
          className="w-full justify-start bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};
