
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getSidebarItems } from "./sidebar-data";
import { supabase } from "@/integrations/supabase/client";
import SidebarLink from "./sidebar-link";
import ThemeToggle from "../theme-toggle";

export default function SidebarBody() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  const location = useLocation();

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

  const items = getSidebarItems(userRole);

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-auto">
      <div className="flex-1 py-8">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            {items.map((item) => {
              // Skip items that require specific roles if user doesn't have it
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
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            open[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <SidebarLink
                          key={subItem.href}
                          href={subItem.href}
                          icon={subItem.icon}
                          label={subItem.title}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center justify-between border-t bg-card p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary h-8 w-8 rounded-full" />
          <div>
            <p className="text-sm font-medium">
              {user?.email ?? "User"}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole ?? "loading..."}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
