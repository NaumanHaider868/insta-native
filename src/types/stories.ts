export type Story = {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
};

export type StoryItemProps = {
  username: string;
  avatar: string;
  seen?: boolean;
  isCurrentUser?: boolean;
};
