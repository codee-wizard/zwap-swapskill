export interface Review {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: string;
  rating: number; // 1..5
  comment: string;
  skill: string;
  createdAt: string;
}
