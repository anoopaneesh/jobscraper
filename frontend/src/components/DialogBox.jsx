
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'


const DialogBox = (props) => {
    const { title, openAction, actionProps, onClose: onCloseDialog, onSubmit, children, size } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {openAction(onOpen)}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title || 'Dialog'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children || <></>}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={4} variant='ghost' onClick={() => {
                            onClose()
                            onCloseDialog && onCloseDialog()
                        }}>{actionProps.secondaryTitle || "Secondary"}</Button>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            onSubmit && onSubmit()
                            onClose()
                        }}>
                            {actionProps.primaryTitle || "Primary"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DialogBox