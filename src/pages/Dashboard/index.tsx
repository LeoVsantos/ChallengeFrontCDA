import { Flex, SimpleGrid, Box, Text, Heading } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function Dashboard() {
  return (
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box
              p={["6", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Prisões  efetuadas</Text>   
              <Flex h="80%" align="center" justify="center">
                <Heading fontSize="7xl">18</Heading>
              </Flex>
            </Box>
            <Box
              p={["6", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Multas aplicadas</Text> 
              <Flex h="80%" align="center" justify="center">
                <Heading fontSize="7xl">22</Heading>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    );
}