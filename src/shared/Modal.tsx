import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { ReactNode } from "react";

interface IProps{
    isOpen:boolean;
    onClose: () => void;
    cancelTxt:string;
    title:string;
    okTxt:string;
    onSubmitHandler:()=>void;
    isLoading:boolean;
    children: ReactNode;


}



const CustomModal = ({isOpen,onClose,title,cancelTxt,okTxt,onSubmitHandler,isLoading,children}: IProps) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay bg="blackAlfa.500"  backdropFilter="blur(5px) hue-rotate(90deg)"/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              {cancelTxt}
            </Button>
            <Button colorScheme='blue'isLoading={isLoading} onClick={onSubmitHandler}>{okTxt}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal