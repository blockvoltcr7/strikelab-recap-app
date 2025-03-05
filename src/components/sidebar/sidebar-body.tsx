
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useSidebar } from "./use-sidebar";
import { SidebarMenuItems } from "./sidebar-menu-items";
import { SidebarUserProfile } from "./sidebar-user-profile";

export default function SidebarBody() {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  const { isCollapsed } = useSidebar();
  
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

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-auto">
      <div className="flex-1 py-2">
        <div className="px-1">
          <SidebarMenuItems userRole={userRole} isCollapsed={isCollapsed} />
        </div>
      </div>
      
      <SidebarUserProfile userRole={userRole} isCollapsed={isCollapsed} />
    </div>
  );
}
