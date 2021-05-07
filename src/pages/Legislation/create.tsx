import { Box, Button, Divider, Flex , Heading, HStack, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/apiClient";
import { useState } from "react";
import { NumberInput } from "../../components/Form/NumberInput";

export default function CreateUser(){
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('0.00');

  type CreateLegislationForm = {
    nome: string;
    descricao: string;
    multa: number;
    tempoPrisao: number;
    status: string;
  };
  
  const createLegislationFormSchema = yup.object().shape({
    nome: yup.string().required('Nome/Titulo obrigatorio'),
    descricao: yup.string().required('Descricao obrigatoria'),
    tempoPrisao: yup.string().required('Tempo de prisao necessario.')
  })

    const toast = useToast()
  
    const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(createLegislationFormSchema)
    });
  
    const { errors } = formState;
  
    const handleSignIn: SubmitHandler<CreateLegislationForm> = async ({nome, descricao, multa, status, tempoPrisao}) => {
      setLoading(true)    
      try {
        
          await api.post('/legislation', {
            nome, 
            descricao, 
            multa: Number(value.replace('.','').replace(',', '.')), 
            status: Number(status), 
            tempoPrisao
          });

          toast({
            title: "Salvo com sucesso",
            description: "Novo decreto adicionado com sucesso.",
            status: "success",
            duration: 3300,
            isClosable: true,
          })

          setLoading(false)  
          history.push('/legislation');

        } catch (err) {
          setLoading(false)  
          toast({
            title: "Erro ao salvar.",
            description: "Houve um erro ao incluir um novo decreto, tente novamente.",
            status: "error",
            duration: 3300,
            isClosable: true,
          })
        }
    }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" p={["6", "8"]} 
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Heading size="lg" fontWeight="normal">Novo decreto</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <Flex direction="column" w="100%">
              <VStack spacing="2">
                <Input 
                label="Nome"  
                error={errors.nome} 
                {...register('nome')}
                />
                <Input 
                  as="textarea" 
                  pt="2" 
                  height="100px" 
                  type="text" 
                  label="Descricao"
                  error={errors.descricao} 
                  {...register('descricao')}
                />
              </VStack>
            </Flex>

            <SimpleGrid minChildWidth="240px" spacing={["6"]} w="100%">
              <NumberInput 
                defaultValue={0.00}
                label="Multa"
                onChange={(e: any) => {setValue(e.target.value)}}
              />
              <Input 
                type="number" 
                label="Tempo de prisao" 
                error={errors.tempoPrisao} 
                {...register('tempoPrisao')}
              />
              <Select 
                focusBorderColor="#6ba4ca"
                bgColor="gray.900"
                variant="filled"
                size="lg"
                error={errors.status} 
                label="Status"
                {...register('status')}
              >
                <option value="1" style={{ background: '#181B23'}}>Ativo</option>
                <option value="2" style={{ background: '#181B23'}}>Inativo</option>
              </Select>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button as={Link} to="/legislation"  colorScheme="whiteAlpha">Cancelar</Button>
              <Button type="submit" isLoading={loading} bg="blue.primary" _hover={{ bg: "blue.secondary" }}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}