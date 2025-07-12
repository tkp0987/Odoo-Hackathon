import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, CheckCircle, XCircle, User, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SwapRequest } from "@/types";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    // Mock swap requests data
    if (user) {
      setSwapRequests([
        {
          id: "1",
          fromUserId: "2",
          toUserId: user.id,
          fromUser: {
            id: "2",
            name: "Sarah Chen",
            email: "sarah@example.com",
            location: "San Francisco, CA",
            avatar: "/placeholder.svg",
            rating: 4.8,
            reviewCount: 23,
            skillsOffered: ["React", "JavaScript"],
            skillsWanted: ["Python"],
            availability: "Weekends",
            isOnline: true,
            isPublic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          toUser: user,
          offeredSkill: "React",
          requestedSkill: "Python",
          message: "Hi! I'd love to learn Python from you. I can teach you React in return.",
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleAcceptRequest = (requestId: string) => {
    console.log('accept swap request', requestId);
    setSwapRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' as const } : req
      )
    );
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('reject swap request', requestId);
    setSwapRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );
  };

  const pendingRequests = swapRequests.filter(req => req.status === 'pending');
  const activeSwaps = swapRequests.filter(req => req.status === 'accepted');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your skill swaps and connections</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">142</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                    <p className="text-2xl font-bold text-gray-900">{activeSwaps.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Your Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requests">
                Swap Requests ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active Swaps ({activeSwaps.length})
              </TabsTrigger>
              <TabsTrigger value="history">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                      <p className="text-gray-500">New swap requests will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={request.fromUser.avatar} alt={request.fromUser.name} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                                  {request.fromUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{request.fromUser.name}</h4>
                                <p className="text-sm text-gray-500">{request.fromUser.location}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleAcceptRequest(request.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <span className="text-gray-600">Offers:</span>
                                <Badge className="ml-2 bg-green-100 text-green-700">
                                  {request.offeredSkill}
                                </Badge>
                              </div>
                              <div className="flex items-center">
                                <span className="text-gray-600">Wants:</span>
                                <Badge className="ml-2" variant="outline">
                                  {request.requestedSkill}
                                </Badge>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                              {request.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Skill Swaps</CardTitle>
                </CardHeader>
                <CardContent>
                  {activeSwaps.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No active swaps</h3>
                      <p className="text-gray-500">Accepted requests will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeSwaps.map((swap) => (
                        <div key={swap.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={swap.fromUser.avatar} alt={swap.fromUser.name} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                                  {swap.fromUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{swap.fromUser.name}</h4>
                                <p className="text-sm text-gray-500">Active since {new Date(swap.updatedAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          </div>
                          
                          <div className="mt-3 flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-600">Teaching:</span>
                              <Badge className="ml-2" variant="outline">
                                {swap.requestedSkill}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600">Learning:</span>
                              <Badge className="ml-2 bg-blue-100 text-blue-700">
                                {swap.offeredSkill}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Swap History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No completed swaps yet</h3>
                    <p className="text-gray-500">Your completed skill swaps and reviews will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
