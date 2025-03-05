
import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { LogoIcon } from "./logo";

interface MobileSidebarContextType {
  setOpen: (open: boolean) => void;
}

const MobileSidebarContext = createContext<MobileSidebarContextType | undefined>(undefined);

export const useMobileSidebar = () => {
  const context = useContext(MobileSidebarContext);
  
  if (context === undefined) {
    throw new Error("useMobileSidebar must be used within a MobileSidebar");
  }
  
  return context;
};

interface MobileSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileSidebar = ({
  className,
  children
}: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div
        className={cn(
          "flex h-14 w-full items-center justify-between bg-sidebar px-4 py-4",
          "border-b border-sidebar-border",
        )}
      >
        <div className="flex items-center">
          <LogoIcon />
        </div>
        <button 
          className="z-20 flex justify-end"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 cursor-pointer text-white" />
        </button>
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
                "backdrop-blur-xl bg-black/90 border border-white/10",
                className,
              )}
            >
              <button
                className="absolute right-6 top-6 z-50 rounded-full p-2 bg-sidebar-accent text-white cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <div className="h-full overflow-y-auto">
                <MobileSidebarContext.Provider value={{ setOpen }}>
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
