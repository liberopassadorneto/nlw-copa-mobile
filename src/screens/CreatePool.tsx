import { Heading, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function CreatePool() {
  const [poolName, setPoolName] = useState("");
  const [isPoolLoading, setIsPoolLoading] = useState(false);
  const toast = useToast();

  async function handleCreatePool() {
    if (!poolName.trim()) {
      return toast.show({
        title: "Pool name is required",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsPoolLoading(true);

      await api.post("/pools", {
        title: poolName.toUpperCase(),
      });

      toast.show({
        title: "Pool created successfully",
        placement: "top",
        bgColor: "green.500",
      });

      setPoolName("");
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Error creating pool",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsPoolLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setPoolName}
          value={poolName}
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreatePool}
          isLoading={isPoolLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
