export type Post = {
  id: string;
  username: string;
  avatar: string;
  date: string;
  image: string[];
  caption: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};

export type PostCardProps = {
  post: Post;
};

export type PostCarouselProps = {
  images: string[];
};
