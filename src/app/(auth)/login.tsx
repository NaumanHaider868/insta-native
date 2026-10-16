import HomeHeader from "@/components/Header";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 justify-center bg-black px-7">
      <View className="mb-10 items-center">
        <HomeHeader />

        <Text className="mt-5 text-center text-base text-gray-400">
          Sign in to see photos and videos from your friends.
        </Text>
      </View>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        placeholderTextColor="#8E8E93"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        className="mb-4 rounded-xl border border-[#363636] bg-[#1C1C1C] px-4 py-4 text-base text-white"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#8E8E93"
        secureTextEntry
        autoCapitalize="none"
        className="mb-5 rounded-xl border border-[#363636] bg-[#1C1C1C] px-4 py-4 text-base text-white"
      />

      <Pressable
        onPress={() => router.replace("/(tabs)/home")}
        className="items-center rounded-xl bg-[#0095F6] py-4 active:bg-[#1877F2]"
      >
        <Text className="font-bold text-white">Log in</Text>
      </Pressable>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="text-gray-400">Don't have an account? </Text>

        <Link href="/register" asChild>
          <Pressable>
            <Text className="font-bold text-[#0095F6]">Register</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
