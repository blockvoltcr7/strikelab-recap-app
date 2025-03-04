
import { motion } from "framer-motion";
import { Shield, Zap, Target, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 p-6 md:p-8"
    >
      {/* Hero Section */}
      <section className="relative rounded-lg bg-gradient-to-br from-red-900/40 to-orange-900/20 p-8 text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Welcome to Strike Lab
          </h1>
          <p className="max-w-2xl text-lg text-gray-200">
            Your premier destination for boxing and martial arts training in Falls Church, VA. 
            Train smarter, get stronger, and join our community of fighters.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Start Training
            </Button>
            <Button size="lg" variant="outline">
              View Schedule
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Expert Training",
            description: "Learn from certified boxing and martial arts instructors"
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: "High-Intensity",
            description: "Dynamic workouts that push your limits"
          },
          {
            icon: <Target className="h-6 w-6" />,
            title: "Focused Goals",
            description: "Personalized training plans for all skill levels"
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Community",
            description: "Join a supportive community of fighters"
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-lg"
          >
            <div className="rounded-full bg-primary/10 p-3 w-fit">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Video Library Promo */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-lg bg-card p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold md:text-3xl">Training Videos</h2>
            <p className="max-w-xl text-muted-foreground">
              Access our library of technique videos, class recaps, and training tips. 
              Perfect your form and stay consistent with your training.
            </p>
          </div>
          <Link to="/videos">
            <Button size="lg" className="gap-2">
              <Video className="h-5 w-5" />
              Browse Library
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
