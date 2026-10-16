import { Ionicons } from "@expo/vector-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { reels } from "@/data/reels";
import type { Reel } from "@/types/reels";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

function ReelItem({ item, isActive }: { item: Reel; isActive: boolean }) {
  const [liked, setLiked] = useState(false);

  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
  });

  // Only play the Reel currently visible on screen.
  if (isActive && player.status === "readyToPlay") {
    player.play();
  } else {
    player.pause();
  }

  return (
    <View style={styles.reel}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Top overlay */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Reels</Text>
        <Pressable onPress={() => console.log("Open camera")} hitSlop={10}>
          <Ionicons name="camera-outline" size={28} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Right-side actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.action}
          onPress={() => setLiked((previous) => !previous)}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={31}
            color={liked ? "#FF3040" : "#FFFFFF"}
          />
          <Text style={styles.actionText}>{liked ? "Liked" : item.likes}</Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={() => console.log("Open comments", item.id)}
        >
          <Ionicons name="chatbubble-outline" size={29} color="#FFFFFF" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={() => console.log("Share Reel", item.id)}
        >
          <Ionicons name="paper-plane-outline" size={29} color="#FFFFFF" />
          <Text style={styles.actionText}>Share</Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={() => console.log("More options", item.id)}
        >
          <Ionicons name="ellipsis-horizontal" size={29} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Bottom caption */}
      <View style={styles.details}>
        <Text style={styles.username}>@{item.username}</Text>
        <Text style={styles.caption} numberOfLines={3}>
          {item.caption}
        </Text>
        <View style={styles.audioRow}>
          <Ionicons name="musical-notes" size={14} color="#FFFFFF" />
          <Text style={styles.audioText}>Original audio</Text>
        </View>
      </View>
    </View>
  );
}

export default function ReelsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReelItem item={item} isActive={index === activeIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.y / SCREEN_HEIGHT,
          );
          setActiveIndex(index);
        }}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  reel: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  topBar: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },
  actions: {
    position: "absolute",
    right: 12,
    bottom: 115,
    alignItems: "center",
    gap: 24,
  },
  action: {
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    position: "absolute",
    left: 16,
    right: 78,
    bottom: 36,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  audioText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
