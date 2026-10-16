import { Ionicons } from "@expo/vector-icons";
import { initialMessages, mockUsers } from "@/data/messages";
import type { DirectMessage, MessageUser } from "@/types/messages";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagesScreen() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<MessageUser | null>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const conversation = selectedUser ? (messages[selectedUser.id] ?? []) : [];

  const sendMessage = () => {
    const text = draft.trim();

    if (!text || !selectedUser) return;

    const newMessage: DirectMessage = {
      id: `${Date.now()}`,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previous) => ({
      ...previous,
      [selectedUser.id]: [...(previous[selectedUser.id] ?? []), newMessage],
    }));

    setDraft("");
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="flex-row items-center border-b border-[#262626] px-4 py-3">
          {selectedUser && (
            <Pressable
              onPress={() => {
                setSelectedUser(null);
                setDraft("");
              }}
              className="mr-3"
              hitSlop={10}
            >
              <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
            </Pressable>
          )}

          {selectedUser ? (
            <>
              <Image
                source={{ uri: selectedUser.avatar }}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-base font-bold text-white">
                  {selectedUser.username}
                </Text>
                <Text className="text-xs text-gray-400">
                  {selectedUser.online ? "Active now" : selectedUser.name}
                </Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={25} color="#FFFFFF" />
            </>
          ) : (
            <>
              <Text className="flex-1 text-2xl font-bold text-white">
                Messages
              </Text>
              <Pressable onPress={() => setSearch("")} hitSlop={10}>
                <Ionicons name="create-outline" size={26} color="#FFFFFF" />
              </Pressable>
            </>
          )}
        </View>

        {!selectedUser ? (
          /* INBOX */
          <View className="flex-1">
            <View className="mx-4 mt-4 flex-row items-center rounded-xl bg-[#1C1C1C] px-3">
              <Ionicons name="search" size={20} color="#8E8E93" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search people"
                placeholderTextColor="#8E8E93"
                autoCapitalize="none"
                className="flex-1 px-3 py-3 text-base text-white"
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch("")}>
                  <Ionicons name="close-circle" size={20} color="#8E8E93" />
                </Pressable>
              )}
            </View>

            <Text className="px-5 pb-3 pt-6 text-base font-bold text-white">
              Messages
            </Text>

            <ScrollView keyboardShouldPersistTaps="handled">
              {filteredUsers.map((user) => {
                const userMessages = messages[user.id] ?? [];
                const lastMessage =
                  userMessages.length > 0
                    ? userMessages[userMessages.length - 1].text
                    : user.lastMessage;

                return (
                  <Pressable
                    key={user.id}
                    onPress={() => setSelectedUser(user)}
                    className="flex-row items-center px-4 py-3 active:bg-[#171717]"
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: user.avatar }}
                        className="h-[54px] w-[54px] rounded-full"
                      />
                      {user.online && (
                        <View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-black bg-[#31D158]" />
                      )}
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-semibold text-white">
                        {user.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="mt-1 text-sm text-gray-400"
                      >
                        {lastMessage}
                      </Text>
                    </View>

                    <Text className="ml-2 text-xs text-gray-500">
                      {user.time}
                    </Text>
                  </Pressable>
                );
              })}

              {filteredUsers.length === 0 && (
                <View className="items-center px-6 py-12">
                  <Ionicons name="search-outline" size={36} color="#8E8E93" />
                  <Text className="mt-3 text-base font-semibold text-white">
                    No users found
                  </Text>
                  <Text className="mt-1 text-sm text-gray-400">
                    Try searching another name or username.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          /* CHAT */
          <View className="flex-1">
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 16, flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="mb-6 mt-3 items-center">
                <Image
                  source={{ uri: selectedUser.avatar }}
                  className="mb-3 h-20 w-20 rounded-full"
                />
                <Text className="text-lg font-bold text-white">
                  {selectedUser.name}
                </Text>
                <Text className="mt-1 text-sm text-gray-400">
                  @{selectedUser.username}
                </Text>
                <Text className="mt-1 text-xs text-gray-500">
                  Instagram · View profile
                </Text>
              </View>

              {conversation.map((message) => {
                const mine = message.sender === "me";

                return (
                  <View
                    key={message.id}
                    className={`mb-3 max-w-[82%] ${
                      mine ? "self-end" : "self-start"
                    }`}
                  >
                    <View
                      className={`rounded-2xl px-4 py-3 ${
                        mine
                          ? "rounded-br-sm bg-[#3797F0]"
                          : "rounded-bl-sm bg-[#262626]"
                      }`}
                    >
                      <Text className="text-[15px] leading-5 text-white">
                        {message.text}
                      </Text>
                    </View>
                    <Text
                      className={`mt-1 text-[10px] text-gray-500 ${
                        mine ? "text-right" : "text-left"
                      }`}
                    >
                      {message.time}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* Message composer */}
            <View className="flex-row items-end gap-2 border-t border-[#262626] px-3 py-3">
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Media",
                    "Photo and video sharing can be added next.",
                  )
                }
                className="mb-1 h-10 w-10 items-center justify-center rounded-full bg-[#262626]"
              >
                <Ionicons name="camera-outline" size={23} color="#FFFFFF" />
              </Pressable>

              <View className="min-h-11 flex-1 flex-row items-center rounded-3xl border border-[#363636] bg-[#1C1C1C] px-4">
                <TextInput
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="Message..."
                  placeholderTextColor="#8E8E93"
                  multiline
                  maxLength={2000}
                  className="max-h-24 flex-1 py-2 text-[15px] text-white"
                />
                {draft.trim().length > 0 && (
                  <Pressable onPress={sendMessage} className="ml-2 py-2">
                    <Text className="font-bold text-[#3797F0]">Send</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
