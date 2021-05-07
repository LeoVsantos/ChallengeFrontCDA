import {  
  FormLabel, 
  FormControl, 
  FormErrorMessage} 
from '@chakra-ui/react';

import { Input } from './Input';

import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends NumberFormatProps {
  name: string;
  defaultValue?: string;
  label?: string;
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<NumberFormat, InputProps> 
  = ({name, label, error = null, defaultValue, ...rest}, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        
        <NumberFormat 
          id={name}
          name={name}
          defaultValue={defaultValue}
          customInput={Input}
          decimalScale={2}
          decimalSeparator=","
          fixedDecimalScale
          ref={ref}
          thousandSeparator="."
          {...rest}
         />

        { !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
    </FormControl>
    );
}

export const NumberInput = forwardRef(InputBase);