
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Dumbbell,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock data for a specific class
const mockClassDetails = {
  "1": {
    id: "1",
    title: "Beginner Kickboxing",
    description: "Perfect for newcomers to learn the fundamentals of kickboxing in a welcoming environment. This class focuses on proper form, basic combinations, and conditioning. You'll learn striking techniques, footwork, and defensive moves while getting a great workout.",
    longDescription: "This beginner-friendly class is designed to introduce you to the fundamentals of kickboxing in a safe and supportive environment. You'll learn proper stance, basic punches, kicks, and defensive techniques while improving your overall fitness. Our experienced instructors will guide you through each movement, ensuring correct form and technique. This class is perfect for those new to martial arts or looking to refresh their basic skills. No previous experience is required, and all equipment will be provided.",
    instructor: {
      id: "i1",
      name: "Alex Johnson",
      bio: "Alex is a certified kickboxing instructor with over 10 years of experience. He specializes in teaching beginners and creating a supportive learning environment.",
      avatar: "/avatar1.png"
    },
    schedule: [
      { day: "Monday", time: "6:00 PM - 7:30 PM" },
      { day: "Wednesday", time: "6:00 PM - 7:30 PM" },
      { day: "Friday", time: "5:30 PM - 7:00 PM" },
    ],
    nextSession: {
      day: "Monday",
      date: "2023-07-10",
      time: "6:00 PM - 7:30 PM",
    },
    capacity: 20,
    registered: 12,
    type: "Group",
    level: "Beginner",
    location: "Main Dojo",
    equipment: ["Comfortable workout clothes", "Water bottle", "Hand wraps (available for purchase)"],
    whatToExpect: [
      "45 minutes of technique instruction",
      "30 minutes of partner drills",
      "15 minutes of conditioning",
      "Cool down and stretching"
    ]
  }
};

const ClassDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  
  // Get class data based on ID
  const classData = id ? mockClassDetails[id as keyof typeof mockClassDetails] : null;
  
  if (!classData) {
    return (
      <div className="container mx-auto py-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Class Not Found</h1>
        <p className="text-muted-foreground mb-6">The class you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/classes')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classes
        </Button>
      </div>
    );
  }
  
  const handleBookClass = () => {
    setIsBooked(true);
    toast({
      title: "Class Booked",
      description: `You've successfully booked ${classData.title}`,
      duration: 5000,
    });
  };
  
  const handleCancelBooking = () => {
    setIsBooked(false);
    toast({
      variant: "destructive",
      title: "Booking Cancelled",
      description: `Your booking for ${classData.title} has been cancelled`,
      duration: 5000,
    });
  };
  
  const handleJoinWaitlist = () => {
    setIsWaitlisted(true);
    toast({
      title: "Added to Waitlist",
      description: "You'll be notified if a spot becomes available",
      duration: 5000,
    });
  };
  
  const handleLeaveWaitlist = () => {
    setIsWaitlisted(false);
    toast({
      variant: "destructive",
      title: "Removed from Waitlist",
      description: "You've been removed from the waitlist",
      duration: 5000,
    });
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/classes')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Classes
      </Button>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main info */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{classData.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {classData.description}
                  </CardDescription>
                </div>
                
                <Badge>{classData.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">About This Class</h3>
                  <p className="text-muted-foreground">{classData.longDescription}</p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">What to Expect</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {classData.whatToExpect.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">What to Bring</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {classData.equipment.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Regular Schedule</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    {classData.schedule.map((session, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-md">
                        <div className="font-medium">{session.day}</div>
                        <div className="text-sm text-muted-foreground">{session.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-2 md:mb-0">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={classData.instructor.avatar} alt={classData.instructor.name} />
                        <AvatarFallback>
                          {classData.instructor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{classData.instructor.name}</div>
                        <div className="text-sm text-muted-foreground">Instructor</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {classData.level}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{classData.registered}/{classData.capacity} Spots</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book This Class</CardTitle>
              <CardDescription>
                Secure your spot for the next session
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isBooked ? (
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium">You're Booked!</h4>
                      <p className="text-sm text-muted-foreground">
                        Your spot is confirmed for the next session.
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleCancelBooking}
                  >
                    Cancel Booking
                  </Button>
                </div>
              ) : classData.registered >= classData.capacity ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium text-destructive flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Class is Full
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join the waitlist to be notified if a spot becomes available.
                    </p>
                  </div>
                  
                  {isWaitlisted ? (
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLeaveWaitlist}
                    >
                      Leave Waitlist
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={handleJoinWaitlist}
                    >
                      Join Waitlist
                    </Button>
                  )}
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={handleBookClass}
                >
                  Book Now
                </Button>
              )}
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Next Session</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {classData.nextSession.day}, {formatDate(classData.nextSession.date)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{classData.nextSession.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{classData.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{classData.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">About the Instructor</h4>
                <div className="flex items-center mb-3">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={classData.instructor.avatar} alt={classData.instructor.name} />
                    <AvatarFallback>
                      {classData.instructor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{classData.instructor.name}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {classData.instructor.bio}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
