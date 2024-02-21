import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function ModelLocation({ isOpen, onOpenChange, handleDelete }) {
  const { isLoading } = useSelector((state) => state.allLocation);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm{" "}
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to delete ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handleDelete}
                  onChange={onClose}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <Spinner className="mr-5" size="sm" color="white" />
                      sending...
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
