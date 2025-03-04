
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
import VideoLibrary from "./pages/videos/VideoLibrary";
import VideoCategory from "./pages/videos/VideoCategory";
import VideoManager from "./pages/videos/VideoManager";
import VideoUpload from "./pages/admin/VideoUpload";
import Home from "./pages/home/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
                <Route path="videos" element={<VideoLibrary />} />
                <Route path="videos/:categoryId" element={<VideoCategory />} />
                <Route path="videos/:categoryId/upload" element={<VideoManager />} />
                <Route path="admin/videos/upload" element={<VideoUpload />} />
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
