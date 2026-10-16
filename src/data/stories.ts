import type { Story, StoryItemProps } from "@/types/stories";

export const currentUserStory: StoryItemProps = {
  username: "Your story",
  avatar: "https://i.pravatar.cc/150?img=68",
  seen: true,
  isCurrentUser: true,
};

export const mockStories: Story[] = [
  {
    id: "1",
    username: "sarah",
    avatar: "https://i.pravatar.cc/150?img=47",
    seen: false,
  },
  {
    id: "2",
    username: "alex",
    avatar: "https://i.pravatar.cc/150?img=12",
    seen: false,
  },
  {
    id: "3",
    username: "emma",
    avatar: "https://i.pravatar.cc/150?img=44",
    seen: true,
  },
  {
    id: "4",
    username: "james",
    avatar: "https://i.pravatar.cc/150?img=13",
    seen: false,
  },
  {
    id: "5",
    username: "olivia",
    avatar: "https://i.pravatar.cc/150?img=49",
    seen: true,
  },
];
