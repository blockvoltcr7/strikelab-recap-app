
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import VideoUploadHeader from "@/components/videos/VideoUploadHeader";
import VideoUploadForm from "@/components/videos/VideoUploadForm";

const VideoManager = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId) {
    return <div>Category not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-3 md:p-5"
    >
      <VideoUploadHeader categoryId={categoryId} />
      <VideoUploadForm categoryId={categoryId} />
    </motion.div>
  );
};

export default VideoManager;
