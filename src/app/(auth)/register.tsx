import HomeHeader from "@/components/Header";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 justify-center bg-black px-7">
      <View className="mb-10 items-center">
        <HomeHeader />

        <Text className="mt-5 text-center text-base text-gray-400">
          Create an account to join the community.
        </Text>
      </View>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        placeholderTextColor="#8E8E93"
        autoCapitalize="words"
        className="mb-4 rounded-xl border border-[#363636] bg-[#1C1C1C] px-4 py-4 text-base text-white"
      />

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
        onPress={() =>
          Alert.alert(
            "Register",
            "We will connect registration to your backend next.",
          )
        }
        className="items-center rounded-xl bg-[#0095F6] py-4 active:bg-[#1877F2]"
      >
        <Text className="font-bold text-white">Create account</Text>
      </Pressable>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="text-gray-400">Already have an account? </Text>

        <Link href="/login" asChild>
          <Pressable>
            <Text className="font-bold text-[#0095F6]">Log in</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
