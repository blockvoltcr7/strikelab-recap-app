
import { useIsMobile } from "../hooks/use-mobile";
import { SidebarLayout, MobileSidebar, SidebarBody } from "../components/sidebar";
import { Outlet } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-screen flex">
      {isMobile ? (
        <div className="flex h-screen flex-col w-full">
          <MobileSidebar>
            <SidebarBody />
          </MobileSidebar>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      )}
    </div>
  );
};

export default Index;
