import { Box } from "@chakra-ui/react";

import LogoImage from '../../assets/logo.png';

export function Logo(){
  return (
    <Box>
      <img src={LogoImage} alt="CidadeAlta" width="60px" />
    </Box>
  )
}