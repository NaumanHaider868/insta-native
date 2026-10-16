import { Ionicons } from "@expo/vector-icons";
import type { SelectedMedia, UploadType } from "@/types/create";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateScreen() {
  const [uploadType, setUploadType] = useState<UploadType>("post");
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);

  const chooseType = (type: UploadType) => {
    setUploadType(type);
    setSelectedMedia([]);
  };

  const pickMedia = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: uploadType === "post" ? ["images"] : ["videos"],
        allowsMultipleSelection: uploadType === "post",
        selectionLimit: uploadType === "post" ? 10 : 1,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      const media: SelectedMedia[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: uploadType === "post" ? "image" : "video",
      }));

      setSelectedMedia(media);
    } catch {
      Alert.alert("Error", "Unable to open your media gallery.");
    }
  };

  const removeMedia = (uri: string) => {
    setSelectedMedia((current) => current.filter((item) => item.uri !== uri));
  };

  const publish = () => {
    if (selectedMedia.length === 0) {
      Alert.alert("Select media", "Choose media before continuing.");
      return;
    }

    // Next step: upload media to your backend.
    Alert.alert(
      "Ready to publish",
      `${uploadType === "post" ? "Post" : "Reel"} selected with ${selectedMedia.length} ${selectedMedia.length === 1 ? "file" : "files"}.`,
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#262626] px-5 py-4">
        <Text className="text-xl font-bold text-white">Create</Text>

        <Pressable
          disabled={selectedMedia.length === 0}
          onPress={publish}
          className={`rounded-lg px-4 py-2 ${
            selectedMedia.length ? "bg-[#0095F6]" : "bg-[#262626]"
          }`}
        >
          <Text className="font-semibold text-white">Next</Text>
        </Pressable>
      </View>

      {/* Post / Reel selector */}
      <View className="flex-row gap-3 px-5 py-5">
        <Pressable
          onPress={() => chooseType("post")}
          className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
            uploadType === "post"
              ? "border-[#0095F6] bg-[#102333]"
              : "border-[#363636] bg-[#171717]"
          }`}
        >
          <Ionicons
            name="images-outline"
            size={20}
            color={uploadType === "post" ? "#0095F6" : "#9CA3AF"}
          />
          <Text className="font-semibold text-white">Post</Text>
        </Pressable>

        <Pressable
          onPress={() => chooseType("reel")}
          className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
            uploadType === "reel"
              ? "border-[#0095F6] bg-[#102333]"
              : "border-[#363636] bg-[#171717]"
          }`}
        >
          <Ionicons
            name="videocam-outline"
            size={20}
            color={uploadType === "reel" ? "#0095F6" : "#9CA3AF"}
          />
          <Text className="font-semibold text-white">Reel</Text>
        </Pressable>
      </View>

      {/* Selection summary */}
      <View className="px-5 pb-3">
        <Text className="text-base font-semibold text-white">
          {uploadType === "post" ? "Select photos" : "Select a video"}
        </Text>
        <Text className="mt-1 text-sm text-gray-400">
          {uploadType === "post"
            ? "Choose up to 10 photos for your carousel post."
            : "Choose one video for your Reel."}
        </Text>
      </View>

      {/* Media preview */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
      >
        {selectedMedia.length === 0 ? (
          <Pressable
            onPress={pickMedia}
            className="min-h-[300px] flex-1 items-center justify-center rounded-3xl border border-dashed border-[#444444] bg-[#111111] px-6"
          >
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-[#222222]">
              <Ionicons
                name={
                  uploadType === "post" ? "images-outline" : "videocam-outline"
                }
                size={32}
                color="#FFFFFF"
              />
            </View>

            <Text className="text-lg font-bold text-white">
              {uploadType === "post" ? "Choose photos" : "Choose a video"}
            </Text>

            <Text className="mt-2 text-center text-sm text-gray-400">
              Tap here to browse your device gallery
            </Text>

            <View className="mt-5 rounded-lg bg-[#0095F6] px-5 py-3">
              <Text className="font-semibold text-white">
                Select from gallery
              </Text>
            </View>
          </Pressable>
        ) : (
          <>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-sm text-gray-300">
                {selectedMedia.length}{" "}
                {selectedMedia.length === 1
                  ? "file selected"
                  : "files selected"}
              </Text>

              <Pressable onPress={pickMedia}>
                <Text className="font-semibold text-[#0095F6]">
                  Change selection
                </Text>
              </Pressable>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {selectedMedia.map((media, index) => (
                <View
                  key={media.uri}
                  className={`relative overflow-hidden rounded-xl ${
                    uploadType === "reel" ? "h-[360px] w-full" : "h-28 w-[30%]"
                  }`}
                >
                  <Image
                    source={{ uri: media.uri }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />

                  {media.type === "video" && (
                    <View className="absolute inset-0 items-center justify-center bg-black/20">
                      <Ionicons name="play-circle" size={48} color="#FFFFFF" />
                    </View>
                  )}

                  {uploadType === "post" && (
                    <View className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1">
                      <Text className="text-xs font-bold text-white">
                        {index + 1}
                      </Text>
                    </View>
                  )}

                  <Pressable
                    onPress={() => removeMedia(media.uri)}
                    className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-black/75"
                  >
                    <Ionicons name="close" size={18} color="#FFFFFF" />
                  </Pressable>
                </View>
              ))}
            </View>

            <Pressable
              onPress={pickMedia}
              className="mt-6 flex-row items-center justify-center gap-2 rounded-xl border border-[#363636] py-4"
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
              <Text className="font-semibold text-white">
                {uploadType === "post"
                  ? "Add more photos"
                  : "Choose another video"}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
