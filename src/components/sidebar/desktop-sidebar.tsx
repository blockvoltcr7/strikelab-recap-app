
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

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
          "hidden h-full w-[280px] flex-shrink-0 bg-white px-4 py-4 dark:bg-neutral-900 md:flex md:flex-col",
          "border-r border-neutral-200 dark:border-neutral-800",
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
