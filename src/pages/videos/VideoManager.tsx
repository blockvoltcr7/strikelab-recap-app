
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

const VideoManager = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile || !title || !categoryId || !user) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please fill in all fields and select a video file.",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      setProgress(0);
      
      // 1. Upload video file to Supabase Storage
      const fileExt = videoFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: fileData } = await supabase.storage
        .from('videos')
        .upload(filePath, videoFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setProgress(Math.round((progress.loaded / progress.total) * 100));
          },
        });
        
      if (uploadError) throw uploadError;
      
      // 2. Create video record in the database
      const { error: dbError } = await supabase
        .from('videos')
        .insert({
          title,
          description,
          category_id: categoryId,
          file_path: filePath,
          created_by: user.id,
        });
        
      if (dbError) throw dbError;
      
      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Navigate to the category page
      navigate(`/videos/${categoryId}`);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "An error occurred during upload.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-3 md:p-5"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <div onClick={() => navigate(`/videos/${categoryId}`)}>
            <ArrowLeft className="h-5 w-5" />
          </div>
        </Button>
        <h1 className="text-3xl font-bold">Upload Video to {getCategoryTitle(categoryId || "")}</h1>
      </div>
      
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
            
            {isUploading && (
              <div className="space-y-2">
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm">{progress}% Uploaded</p>
              </div>
            )}
            
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
    </motion.div>
  );
};

export default VideoManager;
