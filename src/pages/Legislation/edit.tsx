import { 
  Box, 
  Button, 
  Divider, 
  Flex , 
  Heading, 
  HStack, 
  SimpleGrid, 
  Spinner, 
  useToast, 
  VStack 
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/apiClient";
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { NumberInput } from "../../components/Form/NumberInput";

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

interface dataProps {
  nome: string;
  descricao: string;
  multa?: number;
  tempoPrisao: number;
  status: number;
}

export default function CreateUser(){
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [legislation, setLegislation] = useState({} as legislationProps);

  const { id } = useParams<ParamProps>();

  useEffect(() => {
    api.get<legislationProps>(`/legislation/${id}`).then(response => {
      setLegislation(response.data)
      console.log('multa', String(response.data.multa.toFixed(2)));
      setValue(String(response.data.multa.toFixed(2)));
      setLoading(false)
    })
  }, [id])


  type CreateLegislationForm = {
    nome: string;
    descricao: string;
    multa: string;
    tempoPrisao: number;
    status: string;
  };
  
  const createLegislationFormSchema = yup.object().shape({
    nome: yup.string().required('Nome/Titulo obrigatorio'),
    descricao: yup.string().required('Descricao obrigatoria'),
  })

    const toast = useToast()
  
    const { register, handleSubmit, formState, reset } = useForm({
      resolver: yupResolver(createLegislationFormSchema)
    });
  
    const { errors } = formState;
  
    const handleSignIn: SubmitHandler<CreateLegislationForm> = async ({nome, descricao, multa, status, tempoPrisao}) => {
      setLoading(true)    
      try {
        const multaUnmaskNumber = Number(value.replace('.', '').replace(',', '.'));
        
        const data: dataProps  = {
          nome, 
          descricao, 
          status: Number(status), 
          tempoPrisao: Number(tempoPrisao),
          multa: multaUnmaskNumber
        }

          const response = await api.put(`/legislation/${id}`, data);
          setLegislation(response.data);
          setValue(String(response.data.multa.toFixed(2)));

          toast({
            title: "Salvo com sucesso",
            description: "Decreto atualizado com sucesso.",
            status: "success",
            duration: 3300,
            isClosable: true,
          })

          setLoading(false)  
          
          reset();
          
        } catch (err) {
          setLoading(false)  
          toast({
            title: "Erro ao salvar.",
            description: "Houve um erro ao alterar esse decreto, tente novamente.",
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
          <Heading size="lg" fontWeight="normal">Editar decreto</Heading>

          <Divider my="6" borderColor="gray.700" />

        {loading && (
           <Flex w="100%" textAlign="center" justify="center" align="center" pt="5">
            <Spinner />
          </Flex>
        )}

        {!loading && (
           <VStack spacing="8">
           <Flex direction="column" w="100%">
             <VStack spacing="2">
               <Input 
               label="Nome"  
               defaultValue={legislation.nome}
               error={errors.nome} 
               {...register('nome')}
               />
               <Input 
                 as="textarea" 
                 defaultValue={legislation.descricao}
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
              defaultValue={Number(value)} 
              label="Multa"
              onChange={(e: any) => {setValue(e.target.value)}}
            />

             <Input 
               defaultValue={legislation.tempoPrisao}
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
               defaultValue={String(legislation.status)}
               {...register('status')}
             >
               <option value="1" style={{ background: '#181B23'}}>Ativo</option>
               <option value="2" style={{ background: '#181B23'}}>Inativo</option>
             </Select>
           </SimpleGrid>
         </VStack>
        )}
         
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button as={Link} to="/legislation" colorScheme="whiteAlpha">Cancelar</Button>
              <Button type="submit" isLoading={loading} bg="blue.primary" _hover={{ bg: "blue.secondary" }}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}