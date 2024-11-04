'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { WelcomeModal } from '@/components/welcome-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar as CalendarIcon, Trophy, History } from 'lucide-react';

export default function ClientDashboard() {
  const { data: session, status } = useSession();
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const checkNewUser = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/users/check-new-user');
          const data = await response.json();
          if (data.isNewUser) {
            setShowWelcome(true);
          }
        } catch (error) {
          console.error('Error checking new user status:', error);
        }
      }
    };

    if (status === 'authenticated') {
      checkNewUser();
    }
  }, [session, status]);

  const handleCloseWelcome = async () => {
    try {
      await fetch('/api/users/mark-welcomed', { method: 'POST' });
      setShowWelcome(false);
    } catch (error) {
      console.error('Error marking user as welcomed:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to access your dashboard.</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reward Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Level {userLevel}</Badge>
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
              <Progress value={(userXP % 100)} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {100 - (userXP % 100)} XP until next level
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <Ticket className="mr-2 h-4 w-4" />
                Book a Ride
              </Button>
              <Button className="w-full" variant="outline">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                No upcoming events scheduled
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                No past events found
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Current Level</h3>
                    <p className="text-sm text-muted-foreground">
                      Level {userLevel} - {userXP} XP
                    </p>
                  </div>
                  <Trophy className="h-6 w-6 text-purple-500" />
                </div>
                <Progress value={(userXP % 100)} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {100 - (userXP % 100)} XP until next level
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <WelcomeModal 
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        userName={session?.user?.name || 'Guest'}
      />
    </div>
  );
}