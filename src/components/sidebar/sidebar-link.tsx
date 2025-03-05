
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  id?: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ 
  href, 
  icon, 
  label, 
  className, 
  id, 
  isCollapsed = false,
  onClick
}: SidebarLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);
  
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex items-center px-3 py-2 my-1 rounded-lg transition-colors",
        isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative z-20 flex items-center", 
        isCollapsed ? "justify-center w-full" : "gap-3"
      )}>
        <span className={cn(
          "flex items-center justify-center",
          isCollapsed ? "mx-auto" : ""
        )}>
          {icon}
        </span>

        {!isCollapsed && (
          <span className="text-sm font-medium text-white whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarLink;
