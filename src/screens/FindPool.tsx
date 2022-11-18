import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function FindPool() {
  const [isJoiningPoolLoading, setIsJoiningPoolLoading] = useState(false);
  const [poolCode, setPoolCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsJoiningPoolLoading(true);

      if (!poolCode.trim()) {
        return toast.show({
          title: "Please enter a pool code",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code: poolCode });

      toast.show({
        title: "Pool joined successfully",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      setIsJoiningPoolLoading(false);

      console.log(error);

      if (error.response?.data?.message === "Pool not found") {
        return toast.show({
          title: "Pool not found",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "Already joined") {
        return toast.show({
          title: "You are already in this pool",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Error joining pool",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setPoolCode}
          value={poolCode}
          autoCapitalize="characters"
        />

        <Button
          title="Buscar Bolão"
          isLoading={isJoiningPoolLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
