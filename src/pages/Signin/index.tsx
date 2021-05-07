import { Flex, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';
import { useState } from 'react';

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  type SignInFormData = {
    user: string;
    password: string;
  };
  
  const signInFormSchema = yup.object().shape({
    user: yup.string().required('Usuario obrigatorio'),
    password: yup.string().required('Senha obrigatoria'),
  })

    const toast = useToast()
    const { signIn } = useAuth();
  
    const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(signInFormSchema)
    });
  
    const { errors } = formState;
  
    const handleSignIn: SubmitHandler<SignInFormData> = async ({user, password}) => {
      setLoading(true);
        try {
          await signIn({
            nome: user,
            senha: password,
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast({
            title: "Erro ao efetuar login.",
            description: "Cheque suas credenciais.",
            status: "error",
            duration: 3300,
            isClosable: true,
          })
        }
    }


  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      direction="column"
    >

      <img src={Logo} alt="cidadealta" width="180px"  />

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      > 

        <Stack spacing="4">
          <Input 
            type="text" 
            label="Usuario"
            error={errors.user} 
            errorBorderColor="red.400"
            {...register('user')}
          />
          <Input 
            type="password" 
            label="Senha" 
            error={errors.password} 
            {...register('password')}
          />
        </Stack>

        <Button isLoading={loading} type="submit" mt="6" bg="blue.primary" _hover={{
          bg: "blue.secondary"
        }} size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
    )
  }