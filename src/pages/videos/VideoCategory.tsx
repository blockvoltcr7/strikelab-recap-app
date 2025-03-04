
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { getCategoryTitle } from "@/utils/categoryUtils";
import VideoCategoryHeader from "@/components/videos/VideoCategoryHeader";
import VideoGrid from "@/components/videos/VideoGrid";
import VideoDetail from "@/components/videos/VideoDetail";

interface Video {
  id: string;
  title: string;
  description: string;
  file_path: string;
  thumbnail_path: string | null;
  created_at: string;
  created_by: string;
}

const VideoCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isCoachOrAdmin, setIsCoachOrAdmin] = useState(false);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }
      
      setIsCoachOrAdmin(data.role === 'coach' || data.role === 'admin');
    };
    
    fetchUserRole();
  }, [user]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('category_id', categoryId)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setVideos(data || []);
      } catch (error: any) {
        console.error("Error fetching videos:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load videos. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, [categoryId, toast]);
  
  // Generate video URL from file path
  const getVideoUrl = (filePath: string) => {
    const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-3 md:p-5"
    >
      <VideoCategoryHeader
        categoryTitle={getCategoryTitle(categoryId || "")}
        categoryId={categoryId || ""}
        isCoachOrAdmin={isCoachOrAdmin}
      />
      
      {selectedVideo ? (
        <VideoDetail
          video={selectedVideo}
          getVideoUrl={getVideoUrl}
          onBack={() => setSelectedVideo(null)}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <VideoGrid
            videos={videos}
            loading={loading}
            categoryId={categoryId || ""}
            isCoachOrAdmin={isCoachOrAdmin}
            getVideoUrl={getVideoUrl}
            onSelectVideo={setSelectedVideo}
          />
        </div>
      )}
    </motion.div>
  );
};

export default VideoCategory;
