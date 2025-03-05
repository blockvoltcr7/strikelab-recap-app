
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface SidebarUserProfileProps {
  userRole?: string;
  isCollapsed: boolean;
}

export const SidebarUserProfile = ({ userRole, isCollapsed }: SidebarUserProfileProps) => {
  const { user, signOut } = useAuth();
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

  if (isCollapsed) {
    return (
      <div className="sticky bottom-0 flex flex-col items-center border-t border-sidebar-border bg-sidebar pt-3 pb-2 gap-3">
        <div 
          className="bg-primary h-7 w-7 rounded-full flex items-center justify-center" 
          title={user?.email || "User"}
        >
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
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
    );
  }

  return (
    <div className="sticky bottom-0 flex flex-col border-t border-sidebar-border bg-sidebar p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary h-7 w-7 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">
              {user?.email ? user.email.split('@')[0] : "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {userRole ?? "loading..."}
            </p>
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full flex items-center justify-start gap-2 text-xs text-white hover:bg-sidebar-accent/50"
        onClick={handleLogout}
      >
        <LogOut className="h-3.5 w-3.5" />
        Logout
      </Button>
    </div>
  );
};
