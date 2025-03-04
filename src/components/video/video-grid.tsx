
import { VideoCard } from "./video-card";

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Boxing Level I - Fundamentals",
    thumbnail: "/placeholder.svg",
    duration: "45:00",
    progress: 75
  },
  {
    id: 2,
    title: "Muay Thai Basics",
    thumbnail: "/placeholder.svg",
    duration: "50:00",
    progress: 30
  },
  {
    id: 3,
    title: "Advanced Boxing Combinations",
    thumbnail: "/placeholder.svg",
    duration: "60:00",
    progress: 0
  },
  {
    id: 4,
    title: "Junior Champs - Basic Footwork",
    thumbnail: "/placeholder.svg",
    duration: "30:00",
    progress: 100
  }
];

export const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_VIDEOS.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
          duration={video.duration}
          progress={video.progress}
        />
      ))}
    </div>
  );
};
