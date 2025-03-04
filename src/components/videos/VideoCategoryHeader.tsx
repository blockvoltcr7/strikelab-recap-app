
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCategoryHeaderProps {
  categoryTitle: string;
  categoryId: string;
  isCoachOrAdmin: boolean;
}

const VideoCategoryHeader = ({ 
  categoryTitle, 
  categoryId, 
  isCoachOrAdmin 
}: VideoCategoryHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/videos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{categoryTitle}</h1>
      </div>
      
      {isCoachOrAdmin && (
        <Button onClick={() => navigate(`/videos/${categoryId}/upload`)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
      )}
    </div>
  );
};

export default VideoCategoryHeader;
