import { useState, useEffect } from "react";
import { Search, Users, BookOpen, Star, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const mockUsers: User[] = [
    {
      id: "2",
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
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@example.com",
      location: "Austin, TX",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviewCount: 31,
      skillsOffered: ["Java", "Spring Boot", "SQL"],
      skillsWanted: ["React", "Node.js", "GraphQL"],
      availability: "Weekdays",
      isOnline: false,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Emily Watson",
      email: "emily@example.com",
      location: "London, UK",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviewCount: 18,
      skillsOffered: ["Python", "Django", "PostgreSQL"],
      skillsWanted: ["AWS", "Docker", "Kubernetes"],
      availability: "Flexible",
      isOnline: true,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const stats = {
    totalUsers: 1247,
    activeSwaps: 89,
    skillsExchanged: 3421,
    satisfaction: 4.8
  };

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

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    u.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Skills,
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {" "}Build Community
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with talented individuals to exchange skills, learn new abilities, 
              and grow together in our collaborative learning community.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for skills like 'React', 'Photography', 'Spanish'..."
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.activeSwaps}</div>
                <div className="text-sm text-gray-600">Active Swaps</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.skillsExchanged.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Skills Exchanged</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.satisfaction}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Cards Section */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-bold text-gray-900">
  {searchTerm ? `Search Results (${filteredUsers.length})` : 'Featured Members'}
</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{member.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{member.rating}</span>
                    <span className="text-gray-500 ml-1">({member.reviewCount} reviews)</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Can teach:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skillsOffered.slice(0, 3).map((skill, index) => (
                        <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skillsOffered.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.skillsOffered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Wants to learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skillsWanted.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skillsWanted.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.skillsWanted.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {member.availability}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">Try searching for different skills or check the spelling</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
