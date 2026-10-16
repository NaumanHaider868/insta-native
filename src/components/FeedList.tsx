import { FlatList, StyleSheet, Text, View } from "react-native";
import { feedPosts } from "@/data/feed";
import PostCard from "./PostCard";

export default function FeedList() {
  return (
    <FlatList
      data={feedPosts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <PostCard post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No posts yet.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  empty: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#D1D5DB",
    fontSize: 14,
  },
});
