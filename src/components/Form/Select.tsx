import { 
  Select as ChakraInput, 
  SelectProps as ChakraInputProps, 
  FormLabel, 
  FormControl, 
  FormErrorMessage
} from '@chakra-ui/react';

import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends ChakraInputProps {
  name: string;
  children: ReactNode;
  label?: string;
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> 
  = ({name, children, label, error = null, ...rest}, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        
        <ChakraInput 
          name={name}
          id={name}
          focusBorderColor="#6ba4ca"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
          ref={ref}
          {...rest}
        >
          {children}
        </ChakraInput>

        { !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
    </FormControl>
    );
}

export const Select = forwardRef(InputBase);