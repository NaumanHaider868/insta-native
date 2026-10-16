import type { DirectMessage, MessageUser } from "@/types/messages";

export const mockUsers: MessageUser[] = [
  {
    id: "1",
    username: "sarah_j",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=47",
    online: true,
    lastMessage: "That photo looks amazing!",
    time: "2m",
  },
  {
    id: "2",
    username: "alex_travels",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: true,
    lastMessage: "Are we meeting tomorrow?",
    time: "15m",
  },
  {
    id: "3",
    username: "emma_style",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=44",
    online: false,
    lastMessage: "Thank you ❤️",
    time: "1h",
  },
  {
    id: "4",
    username: "james_photo",
    name: "James Miller",
    avatar: "https://i.pravatar.cc/150?img=13",
    online: false,
    lastMessage: "Sent you a photo",
    time: "3h",
  },
  {
    id: "5",
    username: "olivia",
    name: "Olivia Smith",
    avatar: "https://i.pravatar.cc/150?img=49",
    online: true,
    lastMessage: "Haha 😂",
    time: "1d",
  },
];

export const initialMessages: Record<string, DirectMessage[]> = {
  "1": [
    { id: "m1", text: "Hey! How are you?", sender: "them", time: "10:30 AM" },
    {
      id: "m2",
      text: "I'm good! How about you?",
      sender: "me",
      time: "10:31 AM",
    },
    {
      id: "m3",
      text: "Doing great! I saw your latest post.",
      sender: "them",
      time: "10:32 AM",
    },
    {
      id: "m4",
      text: "That photo looks amazing! 🔥",
      sender: "them",
      time: "10:32 AM",
    },
  ],
  "2": [
    {
      id: "m5",
      text: "Are we meeting tomorrow?",
      sender: "them",
      time: "9:15 AM",
    },
  ],
  "3": [{ id: "m6", text: "Thank you ❤️", sender: "them", time: "Yesterday" }],
  "4": [],
  "5": [{ id: "m7", text: "Haha 😂", sender: "them", time: "Yesterday" }],
};
