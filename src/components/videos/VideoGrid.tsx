
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileVideo, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Video {
  id: string;
  title: string;
  description: string;
  file_path: string;
  thumbnail_path: string | null;
  created_at: string;
  created_by: string;
}

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  categoryId: string;
  isCoachOrAdmin: boolean;
  getVideoUrl: (filePath: string) => string;
  onSelectVideo: (video: Video) => void;
}

const VideoGrid = ({
  videos,
  loading,
  categoryId,
  isCoachOrAdmin,
  getVideoUrl,
  onSelectVideo
}: VideoGridProps) => {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <Card className="col-span-full flex justify-center items-center p-8">
        <p className="text-muted-foreground">Loading videos...</p>
      </Card>
    );
  }
  
  if (videos.length === 0) {
    return (
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
    );
  }
  
  return (
    <>
      {videos.map((video) => (
        <Card 
          key={video.id}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelectVideo(video)}
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
      ))}
    </>
  );
};

export default VideoGrid;
