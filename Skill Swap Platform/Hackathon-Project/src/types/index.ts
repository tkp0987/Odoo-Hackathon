export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  skillsOffered: string[];
  skillsWanted: string[];
  availability?: string;
  isOnline: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  rating: number;
  comment: string;
  skills: string[];
  createdAt: string;
}
