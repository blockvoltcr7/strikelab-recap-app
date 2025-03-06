
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  CalendarDays, 
  Clock, 
  Filter, 
  Search,
  Users,
  Dumbbell
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for classes
const mockClasses = [
  {
    id: "1",
    title: "Beginner Kickboxing",
    description: "Perfect for newcomers to learn the fundamentals of kickboxing in a welcoming environment.",
    instructor: {
      id: "i1",
      name: "Alex Johnson",
      avatar: "/avatar1.png"
    },
    day: "Monday",
    date: "2023-07-10",
    time: "6:00 PM - 7:30 PM",
    capacity: 20,
    registered: 12,
    type: "Group",
    level: "Beginner",
    location: "Main Dojo"
  },
  {
    id: "2",
    title: "Advanced Sparring",
    description: "Intensive sparring session for experienced fighters looking to refine their techniques.",
    instructor: {
      id: "i2",
      name: "Sarah Wilson",
      avatar: "/avatar2.png"
    },
    day: "Tuesday",
    date: "2023-07-11",
    time: "7:30 PM - 9:00 PM",
    capacity: 16,
    registered: 14,
    type: "Group",
    level: "Advanced",
    location: "Ring Area"
  },
  {
    id: "3",
    title: "Muay Thai Fundamentals",
    description: "Learn the essential techniques of the art of eight limbs.",
    instructor: {
      id: "i3",
      name: "Mike Chang",
      avatar: "/avatar3.png"
    },
    day: "Wednesday",
    date: "2023-07-12",
    time: "5:30 PM - 7:00 PM",
    capacity: 18,
    registered: 9,
    type: "Group",
    level: "Intermediate",
    location: "Main Dojo"
  },
  {
    id: "4",
    title: "Private Coaching Session",
    description: "One-on-one training session tailored to your specific needs and goals.",
    instructor: {
      id: "i1",
      name: "Alex Johnson",
      avatar: "/avatar1.png"
    },
    day: "Thursday",
    date: "2023-07-13",
    time: "4:00 PM - 5:00 PM",
    capacity: 1,
    registered: 0,
    type: "Private",
    level: "Any",
    location: "Training Room 2"
  },
  {
    id: "5",
    title: "Conditioning & Strength",
    description: "Focus on building the strength and conditioning needed for combat sports.",
    instructor: {
      id: "i4",
      name: "Dave Miller",
      avatar: "/avatar4.png"
    },
    day: "Friday",
    date: "2023-07-14",
    time: "6:00 PM - 7:00 PM",
    capacity: 15,
    registered: 7,
    type: "Group",
    level: "All Levels",
    location: "Fitness Area"
  }
];

// Mock data for user's booked classes
const userBookedClasses = [
  {
    id: "2",
    title: "Advanced Sparring",
    day: "Tuesday",
    date: "2023-07-11",
    time: "7:30 PM - 9:00 PM",
    instructor: {
      id: "i2",
      name: "Sarah Wilson",
      avatar: "/avatar2.png"
    }
  }
];

const ClassesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  
  const filteredClasses = mockClasses
    .filter(cls => 
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(cls => filterType ? cls.type === filterType : true)
    .filter(cls => filterLevel ? cls.level === filterLevel : true);
  
  const handleClassClick = (classId: string) => {
    navigate(`/classes/${classId}`);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes & Training</h1>
          <p className="text-muted-foreground mt-1">
            Browse and book group classes or private sessions
          </p>
        </div>
        
        {/* Calendar View Button for future implementation */}
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Calendar View
        </Button>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {filterType || "Class Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType(null)}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Group")}>
              Group Classes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Private")}>
              Private Sessions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Dumbbell className="mr-2 h-4 w-4" />
              {filterLevel || "Skill Level"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterLevel(null)}>
              All Levels
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterLevel("Beginner")}>
              Beginner
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterLevel("Intermediate")}>
              Intermediate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterLevel("Advanced")}>
              Advanced
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="booked">My Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <Card 
                key={cls.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleClassClick(cls.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {cls.description}
                      </CardDescription>
                    </div>
                    <Badge>{cls.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={cls.instructor.avatar} alt={cls.instructor.name} />
                        <AvatarFallback>
                          {cls.instructor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">{cls.instructor.name}</div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{cls.day}, {new Date(cls.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{cls.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{cls.level}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{cls.registered}/{cls.capacity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="default" 
                    className="w-full"
                    disabled={cls.registered >= cls.capacity}
                  >
                    {cls.registered >= cls.capacity ? "Class Full" : "Book Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="booked">
          {userBookedClasses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userBookedClasses.map((cls) => (
                <Card 
                  key={cls.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleClassClick(cls.id)}
                >
                  <CardHeader>
                    <CardTitle>{cls.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={cls.instructor.avatar} alt={cls.instructor.name} />
                          <AvatarFallback>
                            {cls.instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{cls.instructor.name}</div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>{cls.day}, {new Date(cls.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{cls.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                    >
                      Cancel Booking
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Booked Classes</h3>
              <p className="text-muted-foreground text-center max-w-md">
                You haven't booked any classes yet. Browse the available classes and book your spot!
              </p>
              <Button 
                className="mt-4"
                onClick={() => document.querySelector('[data-value="upcoming"]')?.click()}
              >
                View Available Classes
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassesPage;
