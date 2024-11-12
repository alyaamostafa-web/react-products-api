import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,

    Button,
  } from '@chakra-ui/react'
import React, { RefObject } from 'react'

interface IProps{
    isOpen:boolean;
    // onOpen:() => void;
    onClose:() => void;
    title:string;
    description:string;
    cancelTxt:string;
    okTxt:string;
    onOkHandler:()=>void;
    isLoading:boolean

}

function CustomAlertDialog({ isOpen, onClose,title,description,cancelTxt,okTxt,onOkHandler,isLoading }:IProps) {
   
    const cancelRef: RefObject<HTMLButtonElement>  = React.useRef(null)
  
    return (
      <>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay bg="blackAlfa.500"  backdropFilter="blur(5px) hue-rotate(90deg)"/>
  
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {description}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelTxt}
              </Button>
              <Button colorScheme='red' ml={3} onClick={onOkHandler} isLoading={isLoading}>
                {okTxt}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  export default CustomAlertDialog;