import { LinearGradient } from "expo-linear-gradient";
import type { StoryItemProps } from "@/types/stories";
import { Image, StyleSheet, Text, View } from "react-native";

export default function StoryItem({
  username,
  avatar,
  seen = false,
  isCurrentUser = false,
}: StoryItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {seen ? (
          <View style={[styles.ring, styles.seenRing]}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
        ) : (
          <LinearGradient
            colors={["#FF00FF", "#FF8C00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.ring}
          >
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </LinearGradient>
        )}

        {isCurrentUser && (
          <View style={styles.plusBadge}>
            <Text style={styles.plus}>+</Text>
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={styles.username}>
        {username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 78,
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  seenRing: {
    borderWidth: 2,
    borderColor: "#9CA3AF",
    padding: 2,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#000000",
  },
  plusBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0095F6",
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "600",
  },
  username: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
    maxWidth: 78,
    textAlign: "center",
  },
});
