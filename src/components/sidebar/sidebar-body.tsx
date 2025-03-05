
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getSidebarItems } from "./sidebar-data";
import { supabase } from "@/integrations/supabase/client";
import SidebarLink from "./sidebar-link";
import { ThemeToggle } from "../theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileSidebar } from "./mobile-sidebar";
import { useSidebar } from "./use-sidebar";
import { useToast } from "@/hooks/use-toast";

export default function SidebarBody() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { user, signOut } = useAuth();
  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isCollapsed } = useSidebar();
  const { toast } = useToast();
  
  // Get the setOpen function from the mobile sidebar context if in mobile view
  let mobileSidebarControl;
  try {
    mobileSidebarControl = useMobileSidebar();
  } catch (error) {
    // We're not in a mobile sidebar context, that's fine
  }

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    
    fetchUserRole();
  }, [user]);

  const toggleSubmenu = (title: string) => {
    setOpen((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Function to close the mobile sidebar
  const closeMobileSidebar = () => {
    if (isMobile && mobileSidebarControl) {
      mobileSidebarControl.setOpen(false);
    }
  };

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

  const items = getSidebarItems(userRole);

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-auto">
      <div className="flex-1 py-2">
        <div className="px-1">
          <div className="mt-1 space-y-0.5">
            {items.map((item) => {
              if (
                item.requiredRole && 
                userRole && 
                !item.requiredRole.includes(userRole)
              ) {
                return null;
              }

              if (item.submenu) {
                return (
                  <Collapsible
                    key={item.title}
                    open={open[item.title]}
                    onOpenChange={() => toggleSubmenu(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-between px-2 hover:bg-accent ${
                          location.pathname.startsWith(item.href)
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {!isCollapsed && item.title}
                        </span>
                        {!isCollapsed && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              open[item.title] ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-2 mt-0.5 space-y-0.5">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.href} onClick={closeMobileSidebar}>
                          <SidebarLink
                            href={subItem.href}
                            icon={subItem.icon}
                            label={subItem.title}
                            isCollapsed={isCollapsed}
                            id={subItem.href}
                          />
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <div key={item.href} onClick={closeMobileSidebar}>
                  <SidebarLink
                    href={item.href}
                    icon={item.icon}
                    label={item.title}
                    isCollapsed={isCollapsed}
                    id={item.href}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {!isCollapsed ? (
        <div className="sticky bottom-0 flex flex-col border-t bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="bg-primary h-7 w-7 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium">
                  {user?.email ? user.email.split('@')[0] : "User"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole ?? "loading..."}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex items-center justify-start gap-2 text-xs"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      ) : (
        <div className="sticky bottom-0 flex flex-col items-center border-t bg-card pt-3 pb-2 gap-3">
          <div className="bg-primary h-7 w-7 rounded-full flex items-center justify-center" title={user?.email || "User"}>
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
