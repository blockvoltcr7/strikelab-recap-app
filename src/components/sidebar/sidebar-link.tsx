
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  mobileVisible?: boolean;
}

interface SidebarLinkProps {
  link: LinkProps;
  className?: string;
  id?: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ link, className, id, isCollapsed = false, onClick }: SidebarLinkProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <Link
      to={link.href}
      className={cn("group relative px-2 py-1", className)}
      onMouseEnter={() => {
        setHovered(id ?? null);
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
      onClick={handleClick}
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
        {link.icon}

        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.1 }
            }}
            className="inline-block whitespace-pre text-sm font-medium text-sidebar-foreground transition duration-150 group-hover:translate-x-1"
          >
            {link.label}
          </motion.span>
        )}
      </div>
    </Link>
  );
};

export default SidebarLink;
