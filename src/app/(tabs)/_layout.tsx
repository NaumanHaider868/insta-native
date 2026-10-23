import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#8E8E93",

        tabBarStyle: {
          backgroundColor: "#090909",
          borderTopColor: "#262626",
          borderTopWidth: 0.7,
          height: 62 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 6 + insets.bottom,
          elevation: 0,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reels"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "play-circle" : "play-circle-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={29} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=12" }}
              style={{
                width: 27,
                height: 27,
                borderRadius: 14,
                borderWidth: focused ? 2 : 0,
                borderColor: color,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
