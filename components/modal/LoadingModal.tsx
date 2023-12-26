import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { CancelTokenSource } from "axios";

const LoadingModal = ({
  cancelSource,
  setCancelSource,
  isOpen,
  onClose,
}: {
  cancelSource: CancelTokenSource;
  setCancelSource: any;
  isOpen: boolean;
  onClose: any;
}) => {
  const handleOnClick = (e: any) => {
    e.preventDefault();
    cancelSource.cancel();
    setCancelSource(null);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Classifying Image</ModalHeader>
        <ModalBody>
          <div className="w-full flex flex-col items-center">
            <Spinner />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleOnClick} colorScheme="red">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
