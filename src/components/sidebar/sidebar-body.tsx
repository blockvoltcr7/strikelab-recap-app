
import { useSidebar } from "./use-sidebar";
import { SIDEBAR_ITEMS } from "./sidebar-data";
import SidebarLink from "./sidebar-link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface SidebarBodyProps {
  className?: string;
}

export const SidebarBody = ({ className }: SidebarBodyProps) => {
  const { isCollapsed } = useSidebar();
  const { signOut, user } = useAuth();

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
        
        {/* Navigation items */}
        <nav className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarLink 
              key={item.href} 
              link={item} 
              id={`sidebar-link-${item.href}`} 
            />
          ))}
        </nav>
      </div>
      
      {/* Sign out button */}
      <div className="p-3">
        <Button
          variant="outline"
          size={isCollapsed ? "icon" : "default"}
          onClick={signOut}
          className="w-full justify-start"
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
          {!isCollapsed && <span>Sign out</span>}
        </Button>
      </div>
    </div>
  );
};
