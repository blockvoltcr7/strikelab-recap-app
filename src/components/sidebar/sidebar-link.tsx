
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { Link } from "react-router-dom";

interface LinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarLinkProps {
  link: LinkProps;
  className?: string;
  id?: string;
}

const SidebarLink = ({ link, className, id }: SidebarLinkProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
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
    >
      {hovered === id && (
        <motion.div
          layoutId="hovered-sidebar-link"
          className="absolute inset-0 z-10 rounded-lg bg-neutral-100 dark:bg-neutral-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
      <div className="relative z-20 flex items-center justify-start gap-3 py-2 px-2">
        {link.icon}

        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1 }
          }}
          className="inline-block whitespace-pre text-sm font-medium text-neutral-700 transition duration-150 group-hover:translate-x-1 dark:text-neutral-200"
        >
          {link.label}
        </motion.span>
      </div>
    </Link>
  );
};

export default SidebarLink;
