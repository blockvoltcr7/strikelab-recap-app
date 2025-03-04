
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  className?: string;
  children: React.ReactNode;
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: DesktopSidebarProps & Omit<React.ComponentProps<typeof motion.div>, 'children' | 'className'>) => {
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full w-[280px] flex-shrink-0 bg-sidebar px-4 py-4 dark:bg-sidebar md:flex md:flex-col",
          "border-r border-sidebar-border",
          className,
        )}
        initial={{ width: 0 }}
        animate={{
          width: "280px",
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};
