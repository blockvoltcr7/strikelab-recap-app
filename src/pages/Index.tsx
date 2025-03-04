
import { useIsMobile } from "../hooks/use-mobile";
import { SidebarLayout, MobileSidebar, SidebarBody } from "../components/sidebar";
import { Outlet } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile ? (
        <div className="flex h-screen flex-col">
          <MobileSidebar>
            <SidebarBody />
          </MobileSidebar>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        <SidebarLayout>
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </SidebarLayout>
      )}
    </>
  );
};

export default Index;
