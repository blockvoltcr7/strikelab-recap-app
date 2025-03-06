
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for a specific event
const mockEventDetails = {
  "1": {
    id: "1",
    title: "Summer Tournament",
    date: "2023-07-15",
    time: "9:00 AM - 4:00 PM",
    type: "Tournament",
    location: "Main Dojo",
    registrationOpen: true,
    registrationDeadline: "2023-07-10",
    participants: 24,
    maxParticipants: 32,
    description: "Our annual summer tournament featuring brackets for all skill levels. Join us for a day of competition, camaraderie, and skill development. Prizes will be awarded to winners in each division.",
    rules: [
      "All participants must check in 30 minutes before their scheduled match",
      "Proper equipment is required (gloves, mouthguard, etc.)",
      "Matches will follow standard StrikeLab tournament rules",
      "Judges' decisions are final"
    ],
    brackets: [
      {
        name: "Beginner Division",
        participants: 8,
        rounds: [
          { round: 1, matches: [
            { id: 1, player1: "John D.", player2: "Mike T.", winner: null, time: "10:00 AM" },
            { id: 2, player1: "Sarah L.", player2: "James R.", winner: null, time: "10:30 AM" },
            { id: 3, player1: "David M.", player2: "Lisa K.", winner: null, time: "11:00 AM" },
            { id: 4, player1: "Robert P.", player2: "Emily S.", winner: null, time: "11:30 AM" }
          ]}
        ]
      },
      {
        name: "Intermediate Division",
        participants: 8,
        rounds: [
          { round: 1, matches: [
            { id: 5, player1: "Alex W.", player2: "Chris B.", winner: null, time: "1:00 PM" },
            { id: 6, player1: "Patricia D.", player2: "Thomas G.", winner: null, time: "1:30 PM" },
            { id: 7, player1: "Kevin H.", player2: "Olivia R.", winner: null, time: "2:00 PM" },
            { id: 8, player1: "Natalie F.", player2: "Brian K.", winner: null, time: "2:30 PM" }
          ]}
        ]
      },
      {
        name: "Advanced Division",
        participants: 8,
        rounds: [
          { round: 1, matches: [
            { id: 9, player1: "Michael J.", player2: "Steven T.", winner: null, time: "3:00 PM" },
            { id: 10, player1: "Jessica B.", player2: "Ryan D.", winner: null, time: "3:30 PM" },
            { id: 11, player1: "Amanda S.", player2: "Daniel L.", winner: null, time: "4:00 PM" },
            { id: 12, player1: "Zachary P.", player2: "Nicole R.", winner: null, time: "4:30 PM" }
          ]}
        ]
      }
    ],
    registeredParticipants: [
      { id: "u1", name: "Alex Wong", avatar: "/avatar1.png", division: "Intermediate" },
      { id: "u2", name: "Jessica Brown", avatar: "/avatar2.png", division: "Advanced" },
      { id: "u3", name: "David Miller", avatar: "/avatar3.png", division: "Beginner" },
      { id: "u4", name: "Sarah Lee", avatar: "/avatar4.png", division: "Beginner" }
    ]
  }
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Get event data based on ID
  const event = id ? mockEventDetails[id as keyof typeof mockEventDetails] : null;
  
  if (!event) {
    return (
      <div className="container mx-auto py-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleRegister = () => {
    setIsRegistered(true);
    toast({
      title: "Registration Successful",
      description: `You have been registered for ${event.title}`,
      duration: 5000,
    });
  };
  
  const handleUnregister = () => {
    setIsRegistered(false);
    toast({
      variant: "destructive",
      title: "Registration Cancelled",
      description: `You have been removed from ${event.title}`,
      duration: 5000,
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/events')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main info */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {formatDate(event.date)}
                    <Clock className="h-4 w-4 ml-4 mr-1" />
                    {event.time}
                  </CardDescription>
                  <div className="flex mt-2">
                    <Badge className="mr-2">{event.type}</Badge>
                    <Badge variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </Badge>
                  </div>
                </div>
                
                <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                  {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Event Rules</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {event.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {event.participants}/{event.maxParticipants} Participants
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <span>Registration Deadline: {formatDate(event.registrationDeadline)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="brackets" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="brackets">Brackets</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>
            
            <TabsContent value="brackets">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Brackets</CardTitle>
                  <CardDescription>
                    Current match brackets and scheduling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.brackets.map((bracket, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="font-medium flex items-center mb-3">
                        <Trophy className="h-4 w-4 mr-2" />
                        {bracket.name} ({bracket.participants} participants)
                      </h3>
                      
                      {bracket.rounds.map((round) => (
                        <div key={round.round} className="mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Round {round.round}
                          </h4>
                          
                          <div className="grid gap-2">
                            {round.matches.map((match) => (
                              <div 
                                key={match.id} 
                                className="flex justify-between items-center p-3 bg-muted rounded-md"
                              >
                                <div className="flex-1 font-medium">{match.player1}</div>
                                <div className="px-3 text-sm">vs</div>
                                <div className="flex-1 text-right font-medium">{match.player2}</div>
                                <div className="ml-4 text-xs text-muted-foreground">
                                  {match.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="participants">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Participants</CardTitle>
                  <CardDescription>
                    People who have registered for this event
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {event.registeredParticipants.map((participant) => (
                      <div 
                        key={participant.id} 
                        className="flex items-center p-3 bg-muted rounded-md"
                      >
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {participant.division} Division
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Registration sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>
                {event.registrationOpen 
                  ? "Register to participate in this event" 
                  : "Registration is now closed"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRegistered ? (
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium">You're Registered!</h4>
                      <p className="text-sm text-muted-foreground">
                        You're all set for this event.
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleUnregister}
                  >
                    Cancel Registration
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  disabled={!event.registrationOpen}
                  onClick={handleRegister}
                >
                  {event.registrationOpen ? "Register Now" : "Registration Closed"}
                </Button>
              )}
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Event Details</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.time}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.type}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
