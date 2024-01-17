import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { Icons } from "../Icons";

export interface ModalProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  closable = true, // show close button when active
  onClose, // run when modal close
}: ModalProps) => {
  const onCloseModal = () => {
    onClose?.();
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-0 bottom-0 left-0 right-0 bg-shark-970 w-full max-h-screen transform overflow-y-auto p-6 text-left align-middle shadow-xl transition-all">
                {closable && (
                  <div className="fixed z-100 right-[24px] top-[6px] flex items-center h-12 py-8">
                    <button
                      type="button"
                      className="ml-auto ring-0 focus:right-0 focus:outline-none outline-none cursor-pointer"
                      onClick={onCloseModal}
                    >
                      <Icons.close />
                    </button>
                  </div>
                )}
                <div className="flex flex-col grow h-full overflow-scroll pb-6">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.displayName = "Modal";

export { Modal };
