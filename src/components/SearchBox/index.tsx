import { Flex, Input, Icon, InputProps} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export const SearchBox = (props: InputProps) => (
    <Flex
      as="label"
      flex="1"
      p="4"
      maxWidth={1480}
      alignSelf="center"
      color="gray.200"
      position="relative"
      borderWidth="1px"
      borderColor="gray.200"
      bg="transparent"
      borderRadius="md"
  >
    <Input 
      color="gray.50" 
      variant="unstyled"
      px="4"
      mr="4"
      _placeholder={{ color: 'gray.400' }}
      {...props}
    />

    <Icon as={RiSearchLine} fontSize="20" />
  </Flex>
)
