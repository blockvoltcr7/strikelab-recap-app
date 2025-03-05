
import React from "react";
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
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});
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
    setOpenSubmenus((prev) => ({
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
    <div className="space-y-1 py-2">
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
              open={openSubmenus[item.title]}
              onOpenChange={() => toggleSubmenu(item.title)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between px-3 py-2",
                    "hover:bg-sidebar-accent/50 text-white",
                    location.pathname.startsWith(item.href) ? "bg-sidebar-accent" : ""
                  )}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {!isCollapsed && item.title}
                  </span>
                  {!isCollapsed && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openSubmenus[item.title] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-2 mt-1 space-y-1">
                {item.submenu.map((subItem) => (
                  <SidebarLink
                    key={subItem.href}
                    href={subItem.href}
                    icon={subItem.icon}
                    label={subItem.title}
                    isCollapsed={isCollapsed}
                    id={subItem.href}
                    onClick={closeMobileSidebar}
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
            isCollapsed={isCollapsed}
            id={item.href}
            onClick={closeMobileSidebar}
          />
        );
      })}
    </div>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
