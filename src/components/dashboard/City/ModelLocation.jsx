import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";

export default function ModelLocation({
  isOpen,
  onOpenChange,
  handleDelete,
  isLoading,
  label,
}) {
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
                <p>{label || "Are you sure want to delete ?"}</p>
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
