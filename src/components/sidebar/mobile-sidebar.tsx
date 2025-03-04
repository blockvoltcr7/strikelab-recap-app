
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { LogoIcon } from "./logo";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileSidebar = ({
  className,
  children
}: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Create context value to pass down to children
  const mobileSidebarContext = {
    setOpen
  };
  
  return (
    <>
      <div
        className={cn(
          "flex h-14 w-full flex-row items-center justify-between bg-sidebar px-4 py-4",
          "border-b border-sidebar-border",
        )}
      >
        <div className="flex items-center">
          <LogoIcon />
        </div>
        <div className="z-20 flex justify-end">
          <Menu
            className="h-6 w-6 cursor-pointer text-sidebar-foreground"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-sidebar p-4 sm:p-10",
                "glass-morphism",
                className,
              )}
            >
              <div
                className="absolute right-6 top-6 z-50 rounded-full p-2 bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X size={18} />
              </div>
              <div className="h-full overflow-y-auto">
                {/* Pass the setOpen function to children */}
                <MobileSidebarContext.Provider value={mobileSidebarContext}>
                  {children}
                </MobileSidebarContext.Provider>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Create a context to share the setOpen function with child components
import { createContext, useContext } from "react";

interface MobileSidebarContextType {
  setOpen: (open: boolean) => void;
}

const MobileSidebarContext = createContext<MobileSidebarContextType | undefined>(undefined);

// Create a hook to access the mobile sidebar context
export const useMobileSidebar = () => {
  const context = useContext(MobileSidebarContext);
  
  if (context === undefined) {
    throw new Error("useMobileSidebar must be used within a MobileSidebar");
  }
  
  return context;
};
