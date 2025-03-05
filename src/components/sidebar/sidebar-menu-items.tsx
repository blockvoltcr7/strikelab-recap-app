
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { getSidebarItems } from "./sidebar-data";
import SidebarLink from "./sidebar-link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileSidebar } from "./mobile-sidebar";

interface SidebarMenuItemsProps {
  userRole?: string;
  isCollapsed: boolean;
}

export const SidebarMenuItems = ({ userRole, isCollapsed }: SidebarMenuItemsProps) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Get the setOpen function from the mobile sidebar context if in mobile view
  let mobileSidebarControl;
  try {
    mobileSidebarControl = useMobileSidebar();
  } catch (error) {
    // We're not in a mobile sidebar context, that's fine
  }

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

  const items = getSidebarItems(userRole);

  return (
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
  );
};
