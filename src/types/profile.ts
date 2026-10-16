export type ProfilePost = {
  id: string;
  image: string;
  likes: number;
  comments: number;
  type?: "reel";
};

export type ProfileUser = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
  isVerified?: boolean;
};

export type ProfileTab = "posts" | "reels" | "tagged";
