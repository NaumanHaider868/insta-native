import { Feather } from "@expo/vector-icons";
import type { Post, PostCardProps } from "@/types/posts";
import { useState } from "react";
import { Image, Pressable, Share, StyleSheet, Text, View } from "react-native";
import PostCarousel from "./PostCarousel";

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = () => {
    setLiked((previous) => {
      setLikesCount((count) => count + (previous ? -1 : 1));
      return !previous;
    });
  };

  const sharePost = async () => {
    try {
      await Share.share({
        message: `Check out ${post.username}'s post: ${post.image}`,
      });
    } catch (error) {
      console.error("Unable to share post:", error);
    }
  };

  const longCaption = post.caption.length > 100;
  const visibleCaption =
    longCaption && !expanded
      ? `${post.caption.slice(0, 100).trim()}...`
      : post.caption;

  return (
    <View style={styles.card}>
      {/* Post author */}
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />

          <View style={styles.authorText}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.date}>{post.date}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More post options"
          hitSlop={10}
          onPress={() => console.log("Post options:", post.id)}
        >
          <Feather name="more-horizontal" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Post image */}
      <PostCarousel images={post.image} />

      {/* Like, comment and share actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Pressable
            style={styles.action}
            onPress={toggleLike}
            accessibilityRole="button"
            accessibilityLabel={liked ? "Unlike post" : "Like post"}
            hitSlop={6}
          >
            <Feather
              name="heart"
              size={24}
              color={liked ? "#EF4444" : "#9CA3AF"}
              fill={liked ? "#EF4444" : "transparent"}
            />
            <Text style={styles.actionCount}>{likesCount}</Text>
          </Pressable>

          <Pressable
            style={styles.action}
            onPress={() => console.log("Open comments:", post.id)}
            accessibilityRole="button"
            accessibilityLabel="View comments"
            hitSlop={6}
          >
            <Feather name="message-circle" size={23} color="#9CA3AF" />
            <Text style={styles.actionCount}>{post.commentsCount}</Text>
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={sharePost}
            accessibilityRole="button"
            accessibilityLabel="Share post"
            hitSlop={6}
          >
            <Feather name="send" size={22} color="#9CA3AF" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => console.log("Save post:", post.id)}
          accessibilityRole="button"
          accessibilityLabel="Save post"
          hitSlop={8}
        >
          <Feather name="bookmark" size={23} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {visibleCaption}
          {longCaption && (
            <Text
              style={styles.more}
              onPress={() => setExpanded((value) => !value)}
            >
              {expanded ? " Hide" : " more"}
            </Text>
          )}
        </Text>
      </View>

      <Pressable
        onPress={() => console.log("Open comments:", post.id)}
        hitSlop={5}
      >
        <Text style={styles.viewComments}>
          View all {post.commentsCount} comments
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 25,
    backgroundColor: "#FFFFFF1C",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF00FF",
  },
  authorText: {
    gap: 3,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  date: {
    color: "#D1D5DB",
    fontSize: 12,
  },
  postImage: {
    width: "100%",
    height: 360,
    borderRadius: 30,
    backgroundColor: "#292929",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  iconButton: {
    padding: 2,
  },
  actionCount: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  captionContainer: {
    marginTop: 12,
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 21,
  },
  captionUsername: {
    fontWeight: "700",
  },
  more: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: 12,
  },
  viewComments: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
  },
});
