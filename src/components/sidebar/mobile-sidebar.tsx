
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { LogoIcon } from "./logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { primaryLinks, secondaryLinks, moreMenuLink } from "./sidebar-data";
import SidebarLink from "./sidebar-link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MobileSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileSidebar = ({
  className,
  children
}: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const isMobile = useIsMobile();
  
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
                <div className="mb-6 mt-2 text-xl font-bold text-sidebar-foreground">
                  STRIKE LAB
                </div>
                
                {/* Main navigation items */}
                <nav className="flex flex-col gap-1">
                  {/* Display primary links that are marked as mobile visible */}
                  {primaryLinks
                    .filter(link => link.mobileVisible)
                    .map((item, index) => (
                      <SidebarLink 
                        key={`mobile-primary-${index}`} 
                        link={item} 
                        id={`mobile-link-${item.href}`}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                    
                  {/* More menu with collapsible secondary items */}
                  <Collapsible
                    open={moreExpanded}
                    onOpenChange={setMoreExpanded}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="w-full">
                        <SidebarLink 
                          link={moreMenuLink} 
                          id="mobile-more-menu"
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 border-l border-sidebar-border pl-2">
                      {secondaryLinks.map((item, index) => (
                        <SidebarLink 
                          key={`mobile-secondary-${index}`} 
                          link={item} 
                          id={`mobile-more-${item.href}`}
                          onClick={() => setOpen(false)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </nav>
                
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
