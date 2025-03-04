
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import VideoPlayer from "@/components/videos/VideoPlayer";

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
  const navigate = useNavigate();
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
  
  const getCategoryTitle = (id: string) => {
    switch(id) {
      case "boxing":
        return "Boxing";
      case "muay-thai":
        return "Muay Thai Kickboxing";
      case "sparring":
        return "Sparring";
      case "junior-champs":
        return "Junior Champs";
      default:
        return "Unknown Category";
    }
  };

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/videos">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{getCategoryTitle(categoryId || "")}</h1>
        </div>
        
        {isCoachOrAdmin && (
          <Button onClick={() => navigate(`/videos/${categoryId}/upload`)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
        )}
      </div>
      
      {selectedVideo ? (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedVideo(null)}
          >
            Back to Videos
          </Button>
          
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <VideoPlayer 
                url={getVideoUrl(selectedVideo.file_path)}
                title={selectedVideo.title}
              />
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            {selectedVideo.description && (
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Card className="col-span-full flex justify-center items-center p-8">
              <p className="text-muted-foreground">Loading videos...</p>
            </Card>
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <Card 
                key={video.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="aspect-video bg-black flex justify-center items-center">
                  {video.thumbnail_path ? (
                    <img 
                      src={getVideoUrl(video.thumbnail_path)}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileVideo className="h-16 w-16 text-muted-foreground opacity-60" />
                  )}
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                  {video.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-8">
              <div className="text-center space-y-4">
                <FileVideo className="h-16 w-16 mx-auto text-muted-foreground opacity-60" />
                <p className="text-muted-foreground">No videos available for this category yet.</p>
                {isCoachOrAdmin && (
                  <Button onClick={() => navigate(`/videos/${categoryId}/upload`)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload First Video
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default VideoCategory;
