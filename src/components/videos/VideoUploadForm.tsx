
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface VideoUploadFormProps {
  categoryId: string;
}

const VideoUploadForm = ({ categoryId }: VideoUploadFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, uploadVideo } = useVideoUpload();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (videoFile) {
      await uploadVideo({
        title,
        description,
        videoFile,
        categoryId
      });
      
      // Reset form on successful upload
      setTitle("");
      setDescription("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter video title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter video description"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video">Video File</Label>
            <div className="flex items-center gap-2">
              <Input 
                ref={fileInputRef}
                id="video" 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {videoFile ? videoFile.name : "Select Video File"}
              </Button>
              {videoFile && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="icon"
                  onClick={() => {
                    setVideoFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {videoFile && (
              <p className="text-sm text-muted-foreground">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>
          
          {isUploading && <ProgressBar progress={progress} />}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isUploading || !videoFile}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoUploadForm;
