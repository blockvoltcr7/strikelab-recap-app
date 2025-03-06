
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import EventsPage from "./pages/events/EventsPage";
import EventDetails from "./pages/events/EventDetails";
import RewardsPage from "./pages/rewards/RewardsPage";
import ClassesPage from "./pages/classes/ClassesPage";
import ClassDetails from "./pages/classes/ClassDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              >
                <Route index element={<Home />} />
                
                {/* Event Management Routes */}
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:id" element={<EventDetails />} />
                
                {/* Rewards Program Routes */}
                <Route path="rewards" element={<RewardsPage />} />
                
                {/* Class Booking Routes */}
                <Route path="classes" element={<ClassesPage />} />
                <Route path="classes/:id" element={<ClassDetails />} />
                
                {/* Redirect /index to root path */}
                <Route path="index" element={<Navigate to="/" replace />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
