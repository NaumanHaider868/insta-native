import type { ProfilePost, ProfileUser } from "@/types/profile";

export const initialProfile: ProfileUser = {
  id: "me",
  username: "naumanh",
  name: "Nauman Haider",
  bio: "traveler & Creator\n📍 Pakistan",
  avatar: "https://i.pravatar.cc/300?img=12",
  posts: 24,
  followers: 1250,
  following: 380,
};

export const mockPosts: ProfilePost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600",
    likes: 320,
    comments: 21,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    likes: 185,
    comments: 12,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600",
    likes: 540,
    comments: 32,
    type: "reel",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600",
    likes: 245,
    comments: 16,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
    likes: 420,
    comments: 28,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    likes: 198,
    comments: 9,
    type: "reel",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600",
    likes: 280,
    comments: 14,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
    likes: 390,
    comments: 20,
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
    likes: 610,
    comments: 45,
  },
];

export const highlights = [
  {
    id: "1",
    title: "Travel",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200",
  },
  {
    id: "2",
    title: "Work",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200",
  },
  {
    id: "3",
    title: "Nature",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200",
  },
  {
    id: "4",
    title: "Life",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200",
  },
];

export const suggestedUsers: ProfileUser[] = [
  {
    id: "2",
    username: "sarah.designs",
    name: "Sarah Williams",
    bio: "UI/UX Designer ✨\nCreating digital experiences",
    avatar: "https://i.pravatar.cc/300?img=47",
    posts: 68,
    followers: 8420,
    following: 540,
  },
  {
    id: "3",
    username: "mike.travel",
    name: "Mike Johnson",
    bio: "Exploring the world 🌍",
    avatar: "https://i.pravatar.cc/300?img=33",
    posts: 105,
    followers: 12500,
    following: 720,
  },
];
