
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // This would be replaced with real data from an API
  const getCategoryTitle = (id: string) => {
    switch(id) {
      case "boxing":
        return "Boxing";
      case "muay-thai":
        return "Muay Thai Kickboxing";
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
      className="flex flex-col gap-8 p-6 md:p-8"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/videos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{getCategoryTitle(categoryId || "")}</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-card p-6 shadow-md">
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground mt-2">
            Video content for {getCategoryTitle(categoryId || "")} will be available soon.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCategory;
