
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const VideoLibrary = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: "boxing",
      title: "Boxing",
      description: "Master the fundamentals of boxing with our comprehensive video collection."
    },
    {
      id: "muay-thai",
      title: "Muay Thai Kickboxing",
      description: "Learn the art of eight limbs with techniques from professional Muay Thai instructors."
    },
    {
      id: "sparring",
      title: "Sparring",
      description: "Enhance your combat skills with guided sparring sessions and techniques."
    },
    {
      id: "junior-champs",
      title: "Junior Champs",
      description: "Youth-focused training videos designed specifically for our junior fighters."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-3 md:p-5 w-full min-h-screen"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold md:text-4xl">Video Library</h1>
        <p className="text-muted-foreground">Choose a category to browse training videos</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="transition-all duration-200 h-full"
            onClick={() => navigate(`/videos/${category.id}`)}
          >
            <Card className="overflow-hidden h-full bg-black border border-gray-800 cursor-pointer relative hover:border-gray-600 transition-colors">
              <div className="relative h-full">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-center text-xl text-white">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-gray-400">
                    {category.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoLibrary;
