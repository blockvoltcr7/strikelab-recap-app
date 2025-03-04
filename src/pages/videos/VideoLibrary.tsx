
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, Target, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VideoLibrary = () => {
  const categories = [
    {
      id: "boxing",
      title: "Boxing",
      icon: <Target className="h-12 w-12" />,
      description: "Master the fundamentals of boxing with our comprehensive video collection.",
      color: "from-blue-500/20 to-blue-700/20",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "muay-thai",
      title: "Muay Thai Kickboxing",
      icon: <Dumbbell className="h-12 w-12" />,
      description: "Learn the art of eight limbs with techniques from professional Muay Thai instructors.",
      color: "from-red-500/20 to-red-700/20",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    {
      id: "junior-champs",
      title: "Junior Champs",
      icon: <Users className="h-12 w-12" />,
      description: "Youth-focused training videos designed specifically for our junior fighters.",
      color: "from-green-500/20 to-green-700/20",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-6 md:p-8"
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
            className="transition-all duration-200"
          >
            <Card className={`overflow-hidden h-full border bg-gradient-to-br ${category.color}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  {category.icon}
                </div>
                <CardTitle className="text-center text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button className={`${category.buttonColor}`} asChild>
                  <Link to={`/videos/${category.id}`}>Browse Videos</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoLibrary;
