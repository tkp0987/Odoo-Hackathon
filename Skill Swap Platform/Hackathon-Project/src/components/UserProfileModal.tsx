import { useState } from "react";
import { X, Star, MapPin, Clock, MessageCircle, Calendar, Award, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  isOnline: boolean;
}

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  const [showSwapForm, setShowSwapForm] = useState(false);
  const [swapMessage, setSwapMessage] = useState("");
  const [selectedOfferSkill, setSelectedOfferSkill] = useState("");

  const mockReviews = [
    {
      id: 1,
      author: "Alex Thompson",
      rating: 5,
      comment: "Amazing teacher! Sarah helped me understand React hooks in just a few sessions. Highly recommended!",
      date: "2 weeks ago",
      skills: ["React", "JavaScript"]
    },
    {
      id: 2,
      author: "Maria Garcia",
      rating: 5,
      comment: "Very patient and knowledgeable. Great at breaking down complex concepts into simple terms.",
      date: "1 month ago",
      skills: ["UI/UX Design"]
    },
    {
      id: 3,
      author: "John Smith",
      rating: 4,
      comment: "Good experience overall. Sarah was well-prepared and professional.",
      date: "2 months ago",
      skills: ["JavaScript"]
    }
  ];

  const mockUserSkills = ["Python", "Data Science", "Machine Learning"];

  const handleSwapRequest = () => {
    if (!selectedOfferSkill || !swapMessage.trim()) return;
    
    console.log("Swap request:", {
      to: user.id,
      offerSkill: selectedOfferSkill,
      wantSkill: "React", // This would be dynamic based on selection
      message: swapMessage
    });
    
    setShowSwapForm(false);
    setSwapMessage("");
    setSelectedOfferSkill("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">{user.name}</DialogTitle>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{user.rating}</span>
                    <span className="text-gray-500 ml-1">({user.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Skills Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Skills Wanted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.author}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="flex flex-wrap gap-1">
                      {review.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-600" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{user.availability}</p>
              </CardContent>
            </Card>

            {!showSwapForm ? (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowSwapForm(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Propose Skill Swap
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Propose Skill Swap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I can offer:
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedOfferSkill}
                      onChange={(e) => setSelectedOfferSkill(e.target.value)}
                    >
                      <option value="">Select a skill...</option>
                      {mockUserSkills.map((skill, index) => (
                        <option key={index} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message:
                    </label>
                    <Textarea
                      placeholder="Hi! I'd love to learn React from you. I can teach you Python in return..."
                      value={swapMessage}
                      onChange={(e) => setSwapMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleSwapRequest}
                      disabled={!selectedOfferSkill || !swapMessage.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Send Request
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSwapForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
