
import { useSidebar } from "./use-sidebar";
import { primaryLinks, secondaryLinks, moreMenuLink } from "./sidebar-data";
import SidebarLink from "./sidebar-link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarBodyProps {
  className?: string;
}

export const SidebarBody = ({ className }: SidebarBodyProps) => {
  const { isCollapsed } = useSidebar();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [moreExpanded, setMoreExpanded] = useState(false);

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
        {/* App title for mobile */}
        {isMobile && (
          <div className="mb-6 mt-2 text-xl font-bold text-sidebar-foreground">
            STRIKE LAB
          </div>
        )}
        
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
          {primaryLinks.map((item, index) => (
            <SidebarLink 
              key={`sidebar-primary-${index}`} 
              link={item} 
              id={`sidebar-link-${item.href}`} 
            />
          ))}
          
          {/* Divider */}
          <div className="my-2">
            <div className="h-px w-full bg-sidebar-border"></div>
          </div>
          
          {/* Secondary navigation items or More menu */}
          {isMobile ? (
            <Collapsible
              open={moreExpanded}
              onOpenChange={setMoreExpanded}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <div className="w-full">
                  <SidebarLink 
                    link={moreMenuLink} 
                    id="sidebar-more-menu"
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4 border-l border-sidebar-border pl-2">
                {secondaryLinks.map((item, index) => (
                  <SidebarLink 
                    key={`sidebar-more-${index}`} 
                    link={item} 
                    id={`sidebar-more-${item.href}`}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // On desktop, show all secondary links normally
            secondaryLinks.map((item, index) => (
              <SidebarLink 
                key={`sidebar-secondary-${index}`} 
                link={item} 
                id={`sidebar-link-${item.href}`} 
              />
            ))
          )}
        </nav>
      </div>
      
      {/* User profile and logout at the bottom */}
      <div className="mt-auto px-3 pb-4">
        <SidebarLink
          link={{
            label: "User Profile",
            href: "/profile",
            icon: (
              <div className="h-7 w-7 flex-shrink-0 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="h-4 w-4 text-sidebar-accent-foreground" />
              </div>
            ),
          }}
          id="sidebar-user-profile"
        />
        
        <Button
          variant="ghost"
          size="default"
          onClick={handleLogout}
          className="w-full justify-start mt-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="h-5 w-5 mr-3 text-neutral-700 dark:text-neutral-200" />
          <span className="text-sm font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
};
