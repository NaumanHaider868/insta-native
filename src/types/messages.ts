export type MessageUser = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  time: string;
};

export type DirectMessage = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
};
