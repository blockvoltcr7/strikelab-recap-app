
import { useIsMobile } from "../hooks/use-mobile";
import { SidebarLayout, MobileSidebar, DesktopSidebar, SidebarBody } from "../components/sidebar";
import Dashboard from "../components/dashboard/dashboard-content";

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
            <Dashboard />
          </div>
        </div>
      ) : (
        <SidebarLayout>
          <Dashboard />
        </SidebarLayout>
      )}
    </>
  );
};

export default Index;
