import FeedList from "@/components/FeedList";
import HomeHeader from "@/components/Header";
import StoriesRow from "@/components/StoriesRow";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <HomeHeader />
      <StoriesRow />
      <FeedList />
    </View>
  );
}
