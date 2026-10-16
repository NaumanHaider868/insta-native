import { ScrollView, StyleSheet, View } from "react-native";
import { currentUserStory, mockStories } from "@/data/stories";
import StoryItem from "./StoryItem";

export default function StoriesRow() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <StoryItem {...currentUserStory} />

        {mockStories.map((story) => (
          <StoryItem
            key={story.id}
            username={story.username}
            avatar={story.avatar}
            seen={story.seen}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
