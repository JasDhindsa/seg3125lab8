import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { mockSessions } from "../data/mockData";
import { Calendar, Clock, BookOpen, X, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export function StudentDashboard() {
  const [sessions, setSessions] = useState(mockSessions);
  const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const pastSessions = sessions.filter((s) => s.status === "completed");
  const totalHours = pastSessions.reduce((acc, s) => acc + s.duration / 60, 0);

  const handleCancelSession = () => {
    if (cancelSessionId) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === cancelSessionId ? { ...s, status: "cancelled" as const } : s
        )
      );
      setCancelSessionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600 mb-8">Track your learning progress and manage sessions</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingSessions.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{pastSessions.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                  <p className="text-3xl font-bold text-gray-900">{totalHours.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No upcoming sessions</p>
                    <p className="text-sm text-gray-400 mt-2">Book a session to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={session.tutorPhoto}
                          alt={session.tutorName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{session.tutorName}</h3>
                          <p className="text-sm text-gray-600 mb-2">{session.subject}</p>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(session.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.time} ({session.duration} min)
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="w-4 h-4" />
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setCancelSessionId(session.id)}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {pastSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No past sessions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <img
                          src={session.tutorPhoto}
                          alt={session.tutorName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{session.tutorName}</h3>
                          <p className="text-sm text-gray-600 mb-2">{session.subject}</p>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(session.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration} minutes
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          Completed
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Mathematics</span>
                    <span className="text-sm text-gray-600">8 hours</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Chemistry</span>
                    <span className="text-sm text-gray-600">4.5 hours</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Physics</span>
                    <span className="text-sm text-gray-600">3 hours</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Computer Science</span>
                    <span className="text-sm text-gray-600">2 hours</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelSessionId} onOpenChange={() => setCancelSessionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Session?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this session? This action cannot be undone. You may be charged a cancellation fee depending on the timing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Session</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSession}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
