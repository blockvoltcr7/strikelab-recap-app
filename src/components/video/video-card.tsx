
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  progress?: number;
}

export const VideoCard = ({ title, thumbnail, duration, progress = 0 }: VideoCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative aspect-video overflow-hidden rounded-lg bg-card"
    >
      <img 
        src={thumbnail} 
        alt={title}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-full bg-primary/80 p-3">
          <Play className="h-6 w-6" />
        </div>
      </div>
      
      {/* Video info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
          <span>{duration}</span>
          {progress > 0 && (
            <>
              <span>•</span>
              <span>{progress}% completed</span>
            </>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-muted">
          <div 
            className="h-full bg-primary transition-all" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      )}
    </motion.div>
  );
};
