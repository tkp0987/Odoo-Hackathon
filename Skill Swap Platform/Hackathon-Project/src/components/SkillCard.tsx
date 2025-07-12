import { Star, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface SkillCardProps {
  user: User;
  onSelect: () => void;
}

const SkillCard = ({ user, onSelect }: SkillCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {user.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{user.rating}</span>
            <span className="text-gray-500">({user.reviewCount})</span>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Offers</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsOffered.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                {skill}
              </Badge>
            ))}
            {user.skillsOffered.length > 3 && (
              <Badge variant="outline" className="text-gray-500">
                +{user.skillsOffered.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Wants</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsWanted.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                {skill}
              </Badge>
            ))}
            {user.skillsWanted.length > 3 && (
              <Badge variant="outline" className="text-gray-500">
                +{user.skillsWanted.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-2" />
          {user.availability}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            onClick={onSelect}
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              // Handle swap request
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
