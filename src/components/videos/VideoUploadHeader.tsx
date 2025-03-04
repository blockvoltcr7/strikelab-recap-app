
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryTitle } from "@/utils/categoryUtils";

interface VideoUploadHeaderProps {
  categoryId: string;
}

const VideoUploadHeader = ({ categoryId }: VideoUploadHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link to={`/videos/${categoryId}`}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      <h1 className="text-3xl font-bold">Upload Video to {getCategoryTitle(categoryId)}</h1>
    </div>
  );
};

export default VideoUploadHeader;
