import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Icons } from "../Icons";

interface DropdownItem {
  content: ReactNode;
  onClick?: () => void;
}

export interface DropdownProps {
  label?: ReactNode;
  items: DropdownItem[];
  disabled?: boolean;
}

const Dropdown = ({
  label = "Options",
  items,
  disabled = false,
}: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={disabled}
          className="relative flex items-center w-full gap-x-1.5 font-dm-sans rounded-md bg-shark-950 px-3 py-2 text-shark-300 shadow-sm border border-shark-300"
        >
          <span className="text-base font-normal font-dm-sans">{label}</span>
          <div className="ml-auto">
            <Icons.arrowButton />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-1 max-h-[120px] overflow-scroll right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          <div className="divide-y">
            {items?.map(({ content, ...props }, index) => {
              return (
                <Menu.Item disabled={disabled} key={index}>
                  {({ active }) => (
                    <span
                      className={cn(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex px-4 py-2 text-sm"
                      )}
                      {...props}
                    >
                      {content}
                    </span>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.displayName = "Dropdown";

export { Dropdown };
