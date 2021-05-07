import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  modalTitle: string;
  modalBody: string | ReactNode;
  buttonLoading: boolean;
}

export function DialogModal({
  isOpen, 
  onClose, 
  onDelete, 
  modalBody, 
  modalTitle,
  buttonLoading
}: DialogModalProps) {

  const cancelRef = useRef<any>()

  return (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
  <AlertDialogOverlay>
    <AlertDialogContent bg="gray.800">
      <AlertDialogHeader  fontSize="lg" fontWeight="bold">
        {modalTitle}
      </AlertDialogHeader>

      <AlertDialogBody>
        {modalBody}
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose} bg="gray.300">
          Cancelar
        </Button>
        <Button isLoading={buttonLoading} colorScheme="red" onClick={onDelete} ml={3}>
          Remover
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
  </AlertDialog>
  )
}