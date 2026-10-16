import type { Post } from "@/types/posts";

export const feedPosts: Post[] = [
  {
    id: "post-1",
    username: "sarah_j",
    avatar: "https://i.pravatar.cc/150?img=47",
    date: "Oct 16",
    image: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900",
    ],
    caption: "Some moments deserve to be saved forever ✨",
    likesCount: 124,
    commentsCount: 18,
    isLiked: false,
  },
  {
    id: "post-2",
    username: "alex_travels",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "Oct 15",
    image: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
    ],
    caption:
      "A little escape from the busy routine. Nature always finds a way to reset your mind 🌿",
    likesCount: 286,
    commentsCount: 32,
    isLiked: true,
  },
  {
    id: "post-3",
    username: "emma_style",
    avatar: "https://i.pravatar.cc/150?img=44",
    date: "Oct 14",
    image: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop",
    ],
    caption: "Keeping it simple today. What do you think of this look?",
    likesCount: 91,
    commentsCount: 7,
    isLiked: false,
  },
];
