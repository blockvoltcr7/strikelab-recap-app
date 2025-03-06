
import { useState } from "react";
import { 
  Award, 
  Gift, 
  ArrowRight, 
  Check, 
  Clipboard, 
  Trophy, 
  Users,
  Calendar
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
import { 
  Progress 
} from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock user rewards data
const userRewards = {
  points: 350,
  level: "Silver",
  nextLevel: "Gold",
  pointsToNextLevel: 150,
  referrals: 2,
  completedChallenges: 4,
  transactionHistory: [
    { id: 1, date: "2023-06-15", type: "earned", amount: 50, description: "Class attendance" },
    { id: 2, date: "2023-06-12", type: "earned", amount: 100, description: "Referral bonus" },
    { id: 3, date: "2023-06-05", type: "redeemed", amount: -200, description: "Free training session" },
    { id: 4, date: "2023-05-28", type: "earned", amount: 75, description: "Event participation" },
  ]
};

// Mock rewards that can be redeemed
const availableRewards = [
  { 
    id: 1, 
    title: "Free Group Class", 
    description: "Redeem for one free group class of your choice", 
    points: 200,
    image: "class-pass.jpg"
  },
  { 
    id: 2, 
    title: "StrikeLab T-Shirt", 
    description: "Get a premium StrikeLab branded t-shirt", 
    points: 300,
    image: "tshirt.jpg"
  },
  { 
    id: 3, 
    title: "Private Training Session", 
    description: "One-on-one session with a coach of your choice", 
    points: 500,
    image: "private-session.jpg"
  },
  { 
    id: 4, 
    title: "10% Membership Discount", 
    description: "10% discount on your next month's membership", 
    points: 600,
    image: "discount.jpg"
  },
];

// Mock active challenges
const activeChallenges = [
  {
    id: 1,
    title: "10 Classes in a Month",
    description: "Attend 10 or more classes in a single month",
    progress: 6,
    target: 10,
    reward: 150,
    deadline: "June 30, 2023"
  },
  {
    id: 2,
    title: "Bring a Friend",
    description: "Refer a friend who signs up for a membership",
    progress: 1,
    target: 3,
    reward: 200,
    deadline: "Ongoing"
  },
  {
    id: 3,
    title: "Tournament Participation",
    description: "Participate in the upcoming summer tournament",
    progress: 0,
    target: 1,
    reward: 100,
    deadline: "July 15, 2023"
  }
];

const RewardsPage = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("STRIKE123");
  const [referralEmail, setReferralEmail] = useState("");
  
  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };
  
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral Code Copied",
      description: "The referral code has been copied to your clipboard.",
    });
  };
  
  const handleSendReferral = () => {
    if (!referralEmail) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter an email address.",
      });
      return;
    }
    
    toast({
      title: "Referral Sent",
      description: `Invitation sent to ${referralEmail}`,
    });
    setReferralEmail("");
  };
  
  const handleRedeemReward = (rewardId: number, points: number) => {
    if (userRewards.points < points) {
      toast({
        variant: "destructive",
        title: "Not Enough Points",
        description: "You don't have enough points to redeem this reward.",
      });
      return;
    }
    
    toast({
      title: "Reward Redeemed",
      description: "Your reward has been successfully redeemed!",
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
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards Program</h1>
          <p className="text-muted-foreground mt-1">
            Earn points and redeem exclusive rewards
          </p>
        </div>
      </div>
      
      {/* User Points Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg text-center">
              <Trophy className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{userRewards.points}</h3>
              <p className="text-sm text-muted-foreground">Available Points</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg text-center">
              <Award className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-lg font-bold">{userRewards.level} Member</h3>
              <div className="w-full mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{userRewards.level}</span>
                  <span>{userRewards.nextLevel}</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {userRewards.pointsToNextLevel} points to {userRewards.nextLevel}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg text-center">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{userRewards.referrals}</h3>
              <p className="text-sm text-muted-foreground">Successful Referrals</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="rewards">
        <TabsList className="mb-4">
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="refer">Refer Friends</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader className="pb-3">
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-2 bg-muted rounded-lg mb-4">
                    <Gift className="h-16 w-16 text-primary" />
                  </div>
                  <Badge className="w-full justify-center text-center py-1">
                    {reward.points} Points
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={userRewards.points >= reward.points ? "default" : "outline"}
                    disabled={userRewards.points < reward.points}
                    onClick={() => handleRedeemReward(reward.id, reward.points)}
                  >
                    {userRewards.points >= reward.points ? "Redeem Now" : "Not Enough Points"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Challenges Tab */}
        <TabsContent value="challenges">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress: {challenge.progress}/{challenge.target}</span>
                        <span>{Math.round(calculateProgress(challenge.progress, challenge.target))}%</span>
                      </div>
                      <Progress value={calculateProgress(challenge.progress, challenge.target)} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1 text-primary" />
                        {challenge.reward} Points
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {challenge.deadline}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Refer Friends Tab */}
        <TabsContent value="refer">
          <Card>
            <CardHeader>
              <CardTitle>Refer Friends & Earn Points</CardTitle>
              <CardDescription>
                Earn 100 points for each friend who joins StrikeLab with your referral code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Your Referral Code</h3>
                <div className="flex">
                  <Input
                    value={referralCode}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    variant="secondary" 
                    onClick={handleCopyReferralCode}
                    className="rounded-l-none"
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Email a Friend</h3>
                  <div className="flex flex-col space-y-2">
                    <Input
                      placeholder="Friend's email address"
                      type="email"
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                    />
                    <Button onClick={handleSendReferral}>
                      Send Invitation
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">How it Works</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Share your unique referral code with friends</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">When they sign up using your code, you'll earn 100 points</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Your friend gets 50 bonus points for joining through your referral</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">There's no limit to how many friends you can refer!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>
                Your recent points activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRewards.transactionHistory.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex justify-between items-center p-3 bg-muted rounded-md"
                  >
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                    <Badge 
                      variant={transaction.type === "earned" ? "default" : "secondary"}
                      className="ml-auto mr-0"
                    >
                      {transaction.type === "earned" ? "+" : "-"}{Math.abs(transaction.amount)} Points
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsPage;
