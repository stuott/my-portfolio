import { faX, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useId } from "react";
import Button from "./Button";

interface ModalProps {
  buttonIcon?: IconDefinition;
  buttonText?: string;
  buttonTooltip?: string;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
}

const Modal = ({
  buttonIcon,
  buttonText,
  buttonTooltip,
  title,
  children,
  onConfirm,
  onCancel,
  showCloseButton = true,
}: ModalProps) => {
  const modalID = useId();

  const openModal = () => {
    const dialog = document.getElementById(modalID) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const closeModal = () => {
    const dialog = document.getElementById(modalID) as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <>
      <Button
        className="text-zinc-500 hover:text-white"
        icon={buttonIcon}
        onClick={() => {
          openModal();
        }}
        tooltip={buttonTooltip}
      >
        {buttonText}
      </Button>

      <dialog
        id={modalID}
        className="bg-zinc-800 text-white p-8 place-self-center"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold border-b">{title}</h2>
          {showCloseButton && (
            <Button
              icon={faX}
              className="text-white p-2 hover:text-red-500"
              onClick={() => closeModal()}
              tooltip="close"
            ></Button>
          )}
        </div>
        <div className="my-4">{children}</div>
        <div className="flex gap-2 mt-4">
          {onConfirm && (
            <button
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2"
              onClick={() => {
                closeModal();
                onConfirm();
              }}
            >
              confirm
            </button>
          )}
          {onCancel && (
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2"
              onClick={() => {
                closeModal();
                onCancel();
              }}
            >
              cancel
            </button>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
