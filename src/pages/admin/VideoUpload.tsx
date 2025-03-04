
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoUploadForm from "@/components/admin/VideoUploadForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

const VideoUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        navigate("/auth/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        const isCoachOrAdmin = data.role === 'coach' || data.role === 'admin';
        setIsAuthorized(isCoachOrAdmin);

        if (!isCoachOrAdmin) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this page."
          });
          navigate("/");
        }
      } catch (error: any) {
        console.error("Error checking user role:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while checking your permissions."
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [user, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will navigate away in useEffect
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-3 md:p-5"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Video Management</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload New Video</CardTitle>
        </CardHeader>
        <CardContent>
          <VideoUploadForm />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoUpload;
