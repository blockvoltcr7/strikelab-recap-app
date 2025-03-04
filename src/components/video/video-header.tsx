
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const VideoHeader = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <h1 className="text-xl font-semibold">Video Library</h1>
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search videos..." 
          className="pl-9"
        />
      </div>
    </div>
  );
};
