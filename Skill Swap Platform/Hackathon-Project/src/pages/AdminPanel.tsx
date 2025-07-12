import { useState } from "react";
import { Users, MessageSquare, AlertTriangle, BarChart3, Settings, Ban, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, SwapRequest } from "@/types";

const AdminPanel = () => {
  const { toast } = useToast();
  
  // Mock data for admin panel
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviewCount: 23,
      skillsOffered: ["React", "JavaScript", "UI/UX Design"],
      skillsWanted: ["Python", "Data Science", "Machine Learning"],
      availability: "Weekends, Evenings",
      isOnline: true,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [swapRequests] = useState<SwapRequest[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const handleUserAction = (userId: string, action: 'ban' | 'unban' | 'view') => {
    console.log(${action} user ${userId});
    toast({
      title: "Action Completed",
      description: User ${action} action has been executed.
    });
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) return;
    
    console.log("Sending announcement:", announcement);
    toast({
      title: "Announcement Sent",
      description: "Your announcement has been sent to all users."
    });
    setAnnouncement("");
  };

  const stats = {
    totalUsers: users.length,
    activeSwaps: swapRequests.filter(r => r.status === 'accepted').length,
    pendingReports: 3,
    thisWeekSignups: 12
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Administrator
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeSwaps}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingReports}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Week Signups</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.thisWeekSignups}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="swaps">Swap Monitoring</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.isOnline ? "default" : "secondary"}>
                                {user.isOnline ? "Online" : "Offline"}
                              </Badge>
                              <Badge variant={user.isPublic ? "outline" : "secondary"}>
                                {user.isPublic ? "Public" : "Private"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'view')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUserAction(user.id, 'ban')}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="swaps">
              <Card>
                <CardHeader>
                  <CardTitle>Swap Request Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">No Swap Requests</h3>
                    <p className="text-gray-600">All swap requests will be monitored here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements">
              <Card>
                <CardHeader>
                  <CardTitle>Send Platform Announcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Announcement Message
                    </label>
                    <Textarea
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      placeholder="Type your announcement message here..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSendAnnouncement} disabled={!announcement.trim()}>
                    Send to All Users
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Activity Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>New Signups (This Week)</span>
                        <span className="font-semibold">{stats.thisWeekSignups}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Users</span>
                        <span className="font-semibold">{users.filter(u => u.isOnline).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Public Profiles</span>
                        <span className="font-semibold">{users.filter(u => u.isPublic).length}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Download Full Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Exchange Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Swaps Completed</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Rating</span>
                        <span className="font-semibold">4.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Most Popular Skill</span>
                        <span className="font-semibold">React</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Download Statistics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
