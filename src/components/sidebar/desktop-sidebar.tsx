
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  className?: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

export const DesktopSidebar = ({
  className,
  children,
  isCollapsed = false,
  ...props
}: DesktopSidebarProps & Omit<React.ComponentProps<typeof motion.div>, 'children' | 'className'>) => {
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full flex-shrink-0 bg-sidebar px-4 py-4 dark:bg-sidebar",
          "border-r border-sidebar-border relative",
          isCollapsed ? "w-16" : "w-[280px]",
          "md:flex md:flex-col",
          className,
        )}
        animate={{
          width: isCollapsed ? "64px" : "280px",
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};
