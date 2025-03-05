
import { MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label="Toggle theme"
    >
      <MoonStar className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark mode</span>
    </Button>
  );
}
