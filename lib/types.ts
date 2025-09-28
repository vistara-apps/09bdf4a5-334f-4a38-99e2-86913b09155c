export interface User {
  userId: string;
  walletAddress: string;
  displayName: string;
  profilePictureUrl?: string;
  isRunner: boolean;
  rating: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
}

export interface Task {
  taskId: string;
  posterId: string;
  runnerId?: string;
  title: string;
  description: string;
  location: string;
  status: 'posted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  completionTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  taskType: 'grocery' | 'delivery' | 'pet_care' | 'cleaning' | 'other';
  photoUrl?: string;
  poster?: User;
  runner?: User;
}

export interface Message {
  messageId: string;
  taskId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  sender?: User;
}

export interface Rating {
  ratingId: string;
  taskId: string;
  raterId: string;
  ratedUserId: string;
  score: number;
  comment?: string;
  timestamp: Date;
  rater?: User;
  ratedUser?: User;
}

export type TaskType = 'grocery' | 'delivery' | 'pet_care' | 'cleaning' | 'other';
export type TaskStatus = 'posted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
