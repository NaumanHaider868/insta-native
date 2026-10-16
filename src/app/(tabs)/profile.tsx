import {
  highlights,
  initialProfile,
  mockPosts,
  suggestedUsers,
} from "@/data/profile";
import type { ProfilePost, ProfileTab, ProfileUser } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const postSize = (width - 4) / 3;

  const [profile, setProfile] = useState(initialProfile);
  const [viewedUser, setViewedUser] = useState<ProfileUser>(initialProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [editVisible, setEditVisible] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editUsername, setEditUsername] = useState(profile.username);
  const [editBio, setEditBio] = useState(profile.bio);
  const [selectedPost, setSelectedPost] = useState<ProfilePost | null>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const isOwnProfile = viewedUser.id === profile.id;

  const visiblePosts = mockPosts.filter((post) => {
    if (activeTab === "reels") return post.type === "reel";
    if (activeTab === "tagged") return false;
    return post.type !== "reel";
  });

  const openEditProfile = () => {
    setEditName(profile.name);
    setEditUsername(profile.username);
    setEditBio(profile.bio);
    setEditVisible(true);
  };

  const saveProfile = () => {
    if (!editName.trim() || !editUsername.trim()) {
      Alert.alert("Missing information", "Name and username are required.");
      return;
    }

    const updatedProfile = {
      ...profile,
      name: editName.trim(),
      username: editUsername.trim().replace(/^@/, ""),
      bio: editBio,
    };

    setProfile(updatedProfile);
    setViewedUser(updatedProfile);
    setEditVisible(false);
  };

  const openUserProfile = (user: ProfileUser) => {
    setViewedUser(user);
    setIsFollowing(false);
    setActiveTab("posts");
    setSelectedPost(null);
  };

  const returnToMyProfile = () => {
    setViewedUser(profile);
    setIsFollowing(false);
    setActiveTab("posts");
    setSelectedPost(null);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out @${viewedUser.username}'s profile on Instagram!`,
      });
    } catch {
      Alert.alert("Unable to share", "Please try again.");
    }
  };

  const handleLogout = () => {
    setOptionsVisible(false);
    Alert.alert("Log out?", "You will return to the login screen.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  const menuOptions = isOwnProfile
    ? [
        { label: "Settings and privacy", icon: "settings-outline" as const },
        { label: "Your activity", icon: "time-outline" as const },
        { label: "Saved", icon: "bookmark-outline" as const },
        { label: "Archive", icon: "archive-outline" as const },
      ]
    : [
        { label: "Share profile", icon: "share-outline" as const },
        { label: "Report", icon: "flag-outline" as const },
      ];

  const showCount = (count: number) =>
    count >= 1000000
      ? `${(count / 1000000).toFixed(1)}M`
      : count >= 1000
        ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
        : String(count);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={["top"]}>
      {/* Profile top bar */}
      <View className="h-12 flex-row items-center justify-between px-4">
        {!isOwnProfile ? (
          <Pressable onPress={returnToMyProfile} hitSlop={10}>
            <Ionicons name="arrow-back" size={25} color="white" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() =>
              Alert.alert("Create", "Choose Create from the bottom navigation.")
            }
          >
            <Ionicons name="add-circle-outline" size={28} color="white" />
          </Pressable>
        )}

        <View className="flex-row items-center">
          <Text className="text-xl font-bold text-white">
            {viewedUser.username}
          </Text>
          {viewedUser.isVerified && (
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#3797F0"
              style={{ marginLeft: 5 }}
            />
          )}
        </View>

        <Pressable
          onPress={() => setOptionsVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Open profile options"
          hitSlop={10}
        >
          <Ionicons
            name={isOwnProfile ? "menu-outline" : "ellipsis-horizontal"}
            size={28}
            color="white"
          />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar and statistics */}
        <View className="flex-row items-center px-4 pt-3">
          <View className="mr-6">
            <Image
              source={{ uri: viewedUser.avatar }}
              className="h-24 w-24 rounded-full"
            />
          </View>

          <View className="flex-1 flex-row justify-around">
            <Pressable className="items-center">
              <Text className="text-lg font-bold text-white">
                {viewedUser.posts}
              </Text>
              <Text className="text-sm text-white">Posts</Text>
            </Pressable>

            <Pressable
              className="items-center"
              onPress={() =>
                Alert.alert(
                  "Followers",
                  "A real followers list can be connected to your backend.",
                )
              }
            >
              <Text className="text-lg font-bold text-white">
                {showCount(viewedUser.followers + (isFollowing ? 1 : 0))}
              </Text>
              <Text className="text-sm text-white">Followers</Text>
            </Pressable>

            <Pressable
              className="items-center"
              onPress={() =>
                Alert.alert(
                  "Following",
                  "A real following list can be connected to your backend.",
                )
              }
            >
              <Text className="text-lg font-bold text-white">
                {showCount(viewedUser.following)}
              </Text>
              <Text className="text-sm text-white">Following</Text>
            </Pressable>
          </View>
        </View>

        {/* Name and bio */}
        <View className="px-4 pt-3">
          <Text className="font-bold text-white">{viewedUser.name}</Text>
          <Text className="mt-1 text-sm leading-5 text-white">
            {viewedUser.bio}
          </Text>
        </View>

        {/* Profile actions */}
        <View className="mt-4 flex-row gap-2 px-4">
          {isOwnProfile ? (
            <>
              <Pressable
                onPress={openEditProfile}
                className="h-9 flex-1 items-center justify-center rounded-lg bg-[#262626]"
              >
                <Text className="font-semibold text-white">Edit profile</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Share profile",
                    "Share your profile with friends.",
                  )
                }
                className="h-9 flex-1 items-center justify-center rounded-lg bg-[#262626]"
              >
                <Text className="font-semibold text-white">Share profile</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Discover people",
                    "Choose a profile below to preview another user.",
                  )
                }
                className="h-9 w-10 items-center justify-center rounded-lg bg-[#262626]"
              >
                <Ionicons name="person-add-outline" size={19} color="white" />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => setIsFollowing((previous) => !previous)}
                className={`h-9 flex-1 items-center justify-center rounded-lg ${
                  isFollowing ? "bg-[#262626]" : "bg-[#0095F6]"
                }`}
              >
                <Text className="font-semibold text-white">
                  {isFollowing ? "Following" : "Follow"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Messages",
                    `A conversation with @${viewedUser.username} can be opened from your Messages screen.`,
                  )
                }
                className="h-9 flex-1 items-center justify-center rounded-lg bg-[#262626]"
              >
                <Text className="font-semibold text-white">Message</Text>
              </Pressable>

              <Pressable
                onPress={shareProfile}
                className="h-9 w-10 items-center justify-center rounded-lg bg-[#262626]"
              >
                <Ionicons name="share-outline" size={19} color="white" />
              </Pressable>
            </>
          )}
        </View>

        {/* Story highlights — shown on own profile */}
        {isOwnProfile && (
          <View className="mt-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            >
              {highlights.map((highlight) => (
                <Pressable
                  key={highlight.id}
                  onPress={() =>
                    Alert.alert(highlight.title, "Story highlight preview.")
                  }
                  className="mr-4 items-center"
                >
                  <View className="h-[68px] w-[68px] items-center justify-center rounded-full border border-[#555]">
                    <Image
                      source={{ uri: highlight.image }}
                      className="h-[60px] w-[60px] rounded-full"
                    />
                  </View>
                  <Text className="mt-2 text-xs text-white">
                    {highlight.title}
                  </Text>
                </Pressable>
              ))}

              <Pressable
                onPress={() =>
                  Alert.alert(
                    "New highlight",
                    "You can add highlight creation after connecting story data.",
                  )
                }
                className="items-center"
              >
                <View className="h-[68px] w-[68px] items-center justify-center rounded-full border border-[#555]">
                  <Ionicons name="add" size={34} color="white" />
                </View>
                <Text className="mt-2 text-xs text-white">New</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}

        {/* Profile content tabs */}
        <View className="mt-6 flex-row border-t border-[#262626]">
          {(
            [
              { key: "posts", icon: "grid-outline" },
              { key: "reels", icon: "film-outline" },
              { key: "tagged", icon: "person-outline" },
            ] as const
          ).map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`h-12 flex-1 items-center justify-center ${
                activeTab === tab.key ? "border-t border-white" : ""
              }`}
            >
              <Ionicons
                name={tab.icon}
                size={23}
                color={activeTab === tab.key ? "white" : "#777"}
              />
            </Pressable>
          ))}
        </View>

        {/* Posts grid */}
        {activeTab === "tagged" ? (
          <View className="items-center px-8 py-12">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border-2 border-white">
              <Ionicons name="person-outline" size={32} color="white" />
            </View>
            <Text className="text-xl font-bold text-white">
              Photos of {isOwnProfile ? "you" : viewedUser.username}
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-400">
              Photos you are tagged in will appear here.
            </Text>
          </View>
        ) : visiblePosts.length > 0 ? (
          <View className="flex-row flex-wrap" style={{ gap: 2 }}>
            {visiblePosts.map((post) => (
              <Pressable
                key={post.id}
                onPress={() => setSelectedPost(post)}
                style={{ width: postSize, height: postSize }}
              >
                <Image
                  source={{ uri: post.image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
                {post.type === "reel" && (
                  <View className="absolute right-2 top-2">
                    <Ionicons name="play" size={18} color="white" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <View className="items-center py-12">
            <Text className="text-base text-white">No reels yet</Text>
          </View>
        )}

        {/* Demo profile switcher */}
        {isOwnProfile && (
          <View className="px-4 pb-8 pt-8">
            <Text className="mb-4 text-base font-bold text-white">
              Discover people
            </Text>

            {suggestedUsers.map((user) => (
              <Pressable
                key={user.id}
                onPress={() => openUserProfile(user)}
                className="mb-4 flex-row items-center"
              >
                <Image
                  source={{ uri: user.avatar }}
                  className="h-12 w-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                  <Text className="font-semibold text-white">
                    {user.username}
                  </Text>
                  <Text className="text-sm text-gray-400">{user.name}</Text>
                </View>
                <View className="rounded-lg bg-[#262626] px-4 py-2">
                  <Text className="font-semibold text-white">View</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={optionsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setOptionsVisible(false)}
      >
        <View style={styles.optionsOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOptionsVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Close profile options"
          />
          <View style={styles.optionsMenu}>
            {menuOptions.map((option) => (
              <Pressable
                key={option.label}
                onPress={() => {
                  setOptionsVisible(false);
                  if (option.label === "Share profile") {
                    void shareProfile();
                  } else {
                    Alert.alert(
                      option.label,
                      "This option will be available soon.",
                    );
                  }
                }}
                className="h-12 flex-row items-center px-4 active:bg-[#2b2b2b]"
              >
                <Ionicons name={option.icon} size={20} color="white" />
                <Text className="ml-3 text-sm text-white">{option.label}</Text>
              </Pressable>
            ))}
            {isOwnProfile && (
              <Pressable
                onPress={handleLogout}
                className="mt-1 h-12 flex-row items-center border-t border-[#383838] px-4 active:bg-[#2b2b2b]"
              >
                <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                <Text className="ml-3 text-sm font-semibold text-[#FF6B6B]">
                  Log out
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit profile modal */}
      <Modal
        visible={editVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-black">
          <View className="h-14 flex-row items-center justify-between border-b border-[#262626] px-4">
            <Pressable onPress={() => setEditVisible(false)}>
              <Text className="text-base text-white">Cancel</Text>
            </Pressable>
            <Text className="text-base font-bold text-white">Edit profile</Text>
            <Pressable onPress={saveProfile}>
              <Text className="font-bold text-[#3797F0]">Done</Text>
            </Pressable>
          </View>

          <ScrollView className="px-5 pt-6">
            <View className="mb-7 items-center">
              <Image
                source={{ uri: profile.avatar }}
                className="h-24 w-24 rounded-full"
              />
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Change photo",
                    "Connect expo-image-picker to change your profile picture.",
                  )
                }
              >
                <Text className="mt-3 font-semibold text-[#3797F0]">
                  Change profile photo
                </Text>
              </Pressable>
            </View>

            <Text className="mb-2 text-sm text-gray-400">Name</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
              placeholderTextColor="#777"
              className="mb-5 border-b border-[#363636] pb-3 text-base text-white"
            />

            <Text className="mb-2 text-sm text-gray-400">Username</Text>
            <TextInput
              value={editUsername}
              onChangeText={setEditUsername}
              autoCapitalize="none"
              placeholder="username"
              placeholderTextColor="#777"
              className="mb-5 border-b border-[#363636] pb-3 text-base text-white"
            />

            <Text className="mb-2 text-sm text-gray-400">Bio</Text>
            <TextInput
              value={editBio}
              onChangeText={setEditBio}
              multiline
              placeholder="Write something about yourself"
              placeholderTextColor="#777"
              className="min-h-24 border-b border-[#363636] pb-3 text-base text-white"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Selected post preview */}
      <Modal
        visible={selectedPost !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedPost(null)}
      >
        <View className="flex-1 items-center justify-center bg-black/95 px-4">
          <Pressable
            onPress={() => setSelectedPost(null)}
            className="mb-5 self-end p-2"
          >
            <Ionicons name="close" size={30} color="white" />
          </Pressable>

          {selectedPost && (
            <>
              <Image
                source={{ uri: selectedPost.image }}
                resizeMode="contain"
                style={{ width: "100%", height: "65%" }}
              />
              <View className="mt-5 w-full flex-row items-center">
                <Ionicons name="heart-outline" size={22} color="white" />
                <Text className="ml-2 mr-5 text-white">
                  {showCount(selectedPost.likes)}
                </Text>
                <Ionicons name="chatbubble-outline" size={21} color="white" />
                <Text className="ml-2 text-white">
                  {showCount(selectedPost.comments)}
                </Text>
              </View>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  optionsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  optionsMenu: {
    position: "absolute",
    top: 56,
    right: 12,
    width: 240,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#1c1c1c",
    paddingVertical: 6,
    elevation: 12,
  },
});
