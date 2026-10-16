import type { Reel } from "@/types/reels";

export const reels: Reel[] = [
  {
    id: "1",
    video: require("../assets/images/virat.MP4"),
    username: "your_username",
    caption: "First local Reel 🎬",
    likes: "12.4K",
    comments: "328",
  },
  {
    id: "2",
    video: require("../assets/images/video2.MP4"),
    username: "travel_creator",
    caption: "A beautiful moment ✨",
    likes: "8.2K",
    comments: "142",
  },
  {
    id: "3",
    video: require("../assets/images/video1.MP4"),
    username: "daily_vibes",
    caption: "More videos coming soon 🔥",
    likes: "4.5K",
    comments: "89",
  },
];
