
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar,
  CalendarDays,
  Filter,
  ListFilter,
  Users
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "Summer Tournament",
    date: "2023-07-15",
    type: "Tournament",
    registrationOpen: true,
    participants: 24,
    maxParticipants: 32,
    description: "Our annual summer tournament featuring brackets for all skill levels."
  },
  {
    id: "2",
    title: "Weekly Sparring Session",
    date: "2023-07-05",
    type: "Sparring",
    registrationOpen: true,
    participants: 18,
    maxParticipants: 20,
    description: "Open sparring session for all members."
  },
  {
    id: "3",
    title: "Championship Qualifier",
    date: "2023-08-10",
    type: "Tournament",
    registrationOpen: false,
    participants: 16,
    maxParticipants: 16,
    description: "Qualifying round for the regional championships."
  },
  {
    id: "4",
    title: "Technique Workshop",
    date: "2023-07-20",
    type: "Workshop",
    registrationOpen: true,
    participants: 12,
    maxParticipants: 15,
    description: "Special workshop focusing on advanced techniques."
  }
];

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredEvents = mockEvents
    .filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(event => 
      filterType ? event.type === filterType : true
    );
  
  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
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
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events & Tournaments</h1>
          <p className="text-muted-foreground mt-1">
            Register and participate in upcoming events.
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
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {filterType || "Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType(null)}>
              All Events
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Tournament")}>
              Tournaments
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Sparring")}>
              Sparring
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Workshop")}>
              Workshops
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">My Registrations</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEventClick(event.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                      {event.registrationOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(event.date)}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex items-center mt-4">
                    <Badge variant="outline">{event.type}</Badge>
                    <div className="flex items-center ml-auto">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-xs">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={event.registrationOpen ? "default" : "secondary"} 
                    className="w-full"
                    disabled={!event.registrationOpen}
                  >
                    {event.registrationOpen ? "Register Now" : "Registration Closed"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="registered">
          <div className="flex flex-col items-center justify-center py-10">
            <CalendarDays className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No Registered Events</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              You haven't registered for any upcoming events yet. Browse our upcoming events and register today!
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="flex flex-col items-center justify-center py-10">
            <CalendarDays className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No Past Events</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              You haven't participated in any past events yet. Join an upcoming event to see it here later!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
