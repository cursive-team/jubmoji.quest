import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { Icons } from "../Icons";

interface ModalProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-0 bottom-0 left-0 right-0 bg-shark-970 w-full max-w-md transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center h-12 py-8">
                  <button
                    type="button"
                    className="ml-auto"
                    onClick={closeModal}
                  >
                    <Icons.close />
                  </button>
                </div>
                <div className="flex flex-col">{children}</div>
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
