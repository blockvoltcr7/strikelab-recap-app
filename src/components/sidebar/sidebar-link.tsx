
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSidebar } from "./use-sidebar";

interface SidebarLinkProps {
  key?: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  id?: string;
  isCollapsed?: boolean;
}

const SidebarLink = ({ href, icon, label, className, id, isCollapsed = false }: SidebarLinkProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { setIsCollapsed } = useSidebar();
  
  const handleClick = () => {
    // Collapse the sidebar when a link is clicked
    setIsCollapsed(true);
  };
  
  return (
    <Link
      to={href}
      className={cn("group relative px-2 py-1", className)}
      onClick={handleClick}
      onMouseEnter={() => {
        setHovered(id ?? null);
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
    >
      {hovered === id && (
        <motion.div
          layoutId="hovered-sidebar-link"
          className="absolute inset-0 z-10 rounded-lg bg-sidebar-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
      <div className={cn(
        "relative z-20 flex items-center py-2 px-2",
        isCollapsed ? "justify-center" : "justify-start gap-3"
      )}>
        {icon}

        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.1 }
            }}
            className="inline-block whitespace-pre text-sm font-medium text-sidebar-foreground transition duration-150 group-hover:translate-x-1"
          >
            {label}
          </motion.span>
        )}
      </div>
    </Link>
  );
};

export default SidebarLink;
