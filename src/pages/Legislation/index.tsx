import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  HStack, 
  Icon, 
  IconButton, 
  Spinner, 
  Stack, 
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr,
  useRadioGroup
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { RiAddLine, RiDeleteBin2Line, RiEyeLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import { SearchBox } from "../../components/SearchBox";
import { RadioCard } from "../../components/Form/Radio";
import { DialogModal } from "../../components/DialogModal";

interface legislationProps {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  multa: number;
  tempoPrisao: number;
  status: number;
}

export default function UserList(){
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [penalCodes, setPenalCodes] = useState<legislationProps[]>([]);
  const [allData, setAllData] = useState<legislationProps[]>([]);
  const [statusFilter, setStatusFilter] = useState(0);

  const [isOpen, setIsOpen] = useState(0);
  const onClose = () => setIsOpen(0)

  useEffect(() => {
    api.get('legislation').then(response => {
      if(response.status === 200){
        setPenalCodes(response.data);
        setAllData(response.data);
        setLoading(false)
      }
    })
  }, [])

  const handleFilterStatus = (data: string) => {
    let filter = 1;
    setStatusFilter(1)
    if(data === 'Inativo'){
      filter = 2;
      setStatusFilter(2)
    }
    const penalCodesFiltered = allData.filter(data => data.status === filter)
    setPenalCodes(penalCodesFiltered)
  }

  const handleSearch = (value: string) => {
    const search = value.toLowerCase();
    const filtered = allData.filter((data) => 
      data.nome.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1 && 
      data.status === statusFilter)
    setPenalCodes(filtered);
  }

  const handleDelete = async (id: number) => {
    setButtonLoading(true);
    const response = await api.delete(`legislation/${id}`);
    if(response.status === 204){
      const newResults = penalCodes.filter((data) => data.id !== id);
      setAllData(newResults)
      setPenalCodes(newResults);
      onClose();
      setButtonLoading(false);
    }
  }

  const resetPenalCodes = () => {
    setPenalCodes(allData)
    setStatusFilter(0)
  }

  const options = ["Ativo", "Inativo", "Todos"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filterActiveOrInative",
    onChange: (data) => {  
      if(data !== 'Todos'){
        handleFilterStatus(data);
      } else {
        resetPenalCodes()
      } 
    },
  })

  const group = getRootProps()


  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Código Penal</Heading>
              <Button 
                to="/legislation/create"
                as={Link} 
                size="sm" 
                fontSize="sm" 
                bg="blue.primary"
                _hover={
                  {
                    bg: 'blue.secondary'
                  }
                }
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Novo decreto
              </Button>
          </Flex>

          {loading ? (
            <Flex w="100%" textAlign="center" justify="center" align="center" pt="5">
              <Spinner />
            </Flex>
          ): (
 
        <Box>



          <Flex w="100%" py="4">
            <HStack justify="flex-end" w="100%" spacing='4' {...group}>
            <Text>Filtrar:</Text>
            {options.map((value) => {
              const radio = getRadioProps({ value })
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              )
            })}
              
            </HStack>
          </Flex>

          <Flex py="4" flex="1">
              <SearchBox placeholder="Buscar..." onChange={(e) => handleSearch(e.target.value)} />     
          </Flex>


          <Table colorschema="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["2", "2", "4"]} color="gray.300" width="8">
                  <Checkbox />
                </Th>
                <Th>Nome</Th>
                <Th>Data</Th>
                <Th>Multa</Th>
                <Th>Status</Th>
                <Th>Acao</Th>
              </Tr>
            </Thead>
            <Tbody>
                {penalCodes.map(penalcode => (
                     
                      <Tr key={penalcode.id}>
                         <Td px={["2", "2", "4"]}>
                             <Checkbox  />
                           </Td>
                           <Td>
                             <Box>
                               <Text fontWeight="bold">{penalcode.nome}</Text>
                               <Text noOfLines={2} fontSize="sm" color="gray.300">{penalcode.descricao}</Text>
                             </Box>
                           </Td>
                           <Td> 
                             {
                                new Date(penalcode.dataCriacao).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })
                              }
                            </Td>
                           <Td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(penalcode.multa)
                          } 
                          </Td>
                           <Td> {penalcode.status === 1 ? 'Ativo' : 'Inativo'} </Td>
                           <Td> 
                              <Stack spacing="2" direction="row">
                                <IconButton 
                                  as={Link}
                                  to={`/legislation/view/${penalcode.id}`}
                                  aria-label="Visualizar" 
                                  icon={<RiEyeLine />}
                                  bg="blue.primary" 
                                  _hover={{ bg: "blue.secondary"}}
                                /> 
                              <IconButton 
                                  as={Link}
                                  to={`/legislation/${penalcode.id}`}
                                  aria-label="Editar" 
                                  icon={<RiPencilLine />}
                                  bg="green.500" 
                                  _hover={{ bg: "green.600"}}
                                /> 
                              <IconButton 
                                  aria-label="Excluir" 
                                  icon={<RiDeleteBin2Line />}
                                  onClick={() => setIsOpen(penalcode.id)}
                                  bg="red.500" 
                                  _hover={{ bg: "red.600"}}
                                /> 
                              </Stack>
                            </Td>

                          <DialogModal 
                            isOpen={isOpen === penalcode.id} 
                            onClose={onClose} 
                            modalTitle={`Remover codigo penal: ${penalcode.nome}`} 
                            modalBody={
                              `Tem certeza que deseja remover esse codigo penal ? `
                            }
                            buttonLoading={isOpen === penalcode.id && buttonLoading}
                            onDelete={() => { handleDelete(penalcode.id) }}
                          />
                        </Tr>
                    ))}
            </Tbody>
          </Table>
        </Box>
        )}
        <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}