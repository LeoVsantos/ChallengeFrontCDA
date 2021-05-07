import { Box, Button, Divider, Flex , Heading, HStack, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/apiClient";
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";

interface ParamProps {
  id: string;
}

interface legislationProps {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  multa: number;
  tempoPrisao: number;
  status: number;
}

export default function CreateUser(){
  const [loading, setLoading] = useState(true);
  const [legislation, setLegislation] = useState({} as legislationProps);
  const {id} = useParams<ParamProps>();

  useEffect(() => {
    api.get<legislationProps>(`/legislation/${id}`).then(response => {
      setLegislation(response.data)
      setLoading(false)
    })
  }, [id])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" p={["6", "8"]} 
        >
          <Heading size="lg" fontWeight="normal">Visualizar decreto</Heading>

          <Divider my="6" borderColor="gray.700" />


        {loading && (
           <Flex w="100%" textAlign="center" justify="center" align="center" pt="5">
            <Spinner />
          </Flex>
        )}
        
        {!loading && (
           <VStack spacing="8">
           <Flex direction="column" w="90%">
             <VStack spacing="2">
               <Heading>{legislation.nome}</Heading>
               <Text fontSize="lg" textAlign="center">{legislation.descricao}</Text>
             </VStack>
           </Flex>

           <Flex w="100%" justify="space-around">
 
              <Box textAlign="center" bg="gray.900" p="5" borderRadius="lg">
                <Heading>MULTA: </Heading>
                <Text fontSize="25px">{
                   new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(legislation.multa)      
                }</Text>
              </Box>

              <Box textAlign="center" bg="gray.900" p="5" borderRadius="lg">
                <Heading>TEMPO DE PRISAO:</Heading>
                <Text fontSize="25px">{legislation.tempoPrisao}</Text>
              </Box>

              <Box textAlign="center" bg="gray.900" p="5" borderRadius="lg">
                <Heading>STATUS:</Heading>
                <Text fontSize="25px" justify="center">{legislation.status === 1 ? (<Icon color="green.200" as={RiCheckboxCircleLine} />) :  (<Icon color="red.200" as={RiCloseCircleLine} />)}</Text>
              </Box>
       
           </Flex>

           <Divider my="6" borderColor="gray.700" />

         </VStack>
        )}
         
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button as={Link} to="/legislation" colorScheme="whiteAlpha">Voltar</Button>
              <Button as={Link} to={`/legislation/${id}`}  bg="blue.primary" _hover={{ bg: "blue.secondary" }}>Editar decreto</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}