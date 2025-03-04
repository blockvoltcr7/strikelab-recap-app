
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

interface UploadParams {
  title: string;
  description: string;
  videoFile: File;
  categoryId: string;
}

export const useVideoUploadService = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const uploadVideo = async ({ title, description, videoFile, categoryId }: UploadParams) => {
    if (!videoFile || !title || !categoryId || !user) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please fill in all required fields and select a video file.",
      });
      return false;
    }
    
    try {
      setIsUploading(true);
      setProgress(0);
      
      // 1. Upload video file to Supabase Storage
      const fileExt = videoFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Set up an upload progress tracker
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      });
      
      // Upload the file
      const { error: uploadError, data: fileData } = await supabase.storage
        .from('videos')
        .upload(filePath, videoFile, {
          cacheControl: '3600',
          upsert: false,
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
        description: "Your video has been uploaded successfully.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "An error occurred during upload.",
      });
      return false;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };
  
  return {
    isUploading,
    progress,
    uploadVideo
  };
};
