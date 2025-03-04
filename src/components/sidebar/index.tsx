import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { Link } from "react-router-dom";
import SidebarLink from "./sidebar-link";
import { 
  IconApi, 
  IconBrandTabler, 
  IconArrowLeft, 
  IconChecklist, 
  IconMenu2, 
  IconMessagePlus, 
  IconRotate, 
  IconSettings, 
  IconUserBolt, 
  IconX 
} from "@tabler/icons-react";

// Define the Links interface
interface Link {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarLayout = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const primaryLinks: Link[] = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "History",
      href: "/history",
      icon: (
        <IconArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  
  const secondaryLinks = [
    {
      label: "Documentation",
      href: "/docs",
      icon: (
        <IconChecklist className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "API reference",
      href: "/api",
      icon: (
        <IconApi className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Support",
      href: "/support",
      icon: (
        <IconMessagePlus className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Updates",
      href: "/updates",
      icon: (
        <IconRotate className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 md:flex-row",
        className,
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col">
              {primaryLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} id={`primary-link-${idx}`} />
              ))}
            </div>
            <div className="mt-4">
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-px w-full bg-white dark:bg-neutral-900"></div>
            </div>
            <div className="mt-4 flex flex-col">
              {secondaryLinks.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  id={`secondary-link-${idx}`}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User Profile",
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                    <IconUserBolt className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 px-4 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Elegant UI
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
    </Link>
  );
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar className={props.className}>
        {props.children}
      </MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
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

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "flex h-14 w-full flex-row items-center justify-between bg-white px-4 py-4 dark:bg-neutral-900 md:hidden",
          "border-b border-neutral-200 dark:border-neutral-800",
        )}
      >
        <LogoIcon />
        <div className="z-20 flex w-full justify-end">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
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
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-4 dark:bg-neutral-900 sm:p-10",
                "glass-morphism",
                className,
              )}
            >
              <div
                className="absolute right-6 top-6 z-50 rounded-full p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <IconX size={18} />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
