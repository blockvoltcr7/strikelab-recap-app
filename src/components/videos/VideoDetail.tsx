
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface VideoDetailProps {
  video: Video;
  getVideoUrl: (filePath: string) => string;
  onBack: () => void;
}

const VideoDetail = ({ video, getVideoUrl, onBack }: VideoDetailProps) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        onClick={onBack}
      >
        Back to Videos
      </Button>
      
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <VideoPlayer 
            url={getVideoUrl(video.file_path)}
            title={video.title}
          />
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{video.title}</h2>
        {video.description && (
          <p className="text-muted-foreground">{video.description}</p>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
