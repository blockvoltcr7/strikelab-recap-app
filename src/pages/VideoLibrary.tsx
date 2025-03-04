
import { VideoCard } from "@/components/video/video-card";
import { VideoHeader } from "@/components/video/video-header";
import { VideoGrid } from "@/components/video/video-grid";
import { motion } from "framer-motion";

const VideoLibrary = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full w-full flex-col gap-4 p-4"
    >
      <VideoHeader />
      <VideoGrid />
    </motion.div>
  );
};

export default VideoLibrary;
