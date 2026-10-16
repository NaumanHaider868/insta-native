import { StyleSheet, View } from "react-native";
import InstaB from "../assets/images/insta-white.svg";

export default function HomeHeader() {
  return (
    <View style={styles.navbar}>
      <InstaB width={205} height={45} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 58,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
