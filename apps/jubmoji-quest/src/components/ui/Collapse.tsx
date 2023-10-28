import { Disclosure, Transition } from "@headlessui/react";
import { Card } from "../cards/Card";
import { Icons } from "../Icons";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CollapseProps = {
  title: string;
  description: ReactNode;
};

const Collapse = ({ title, description }: CollapseProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Disclosure.Button className="w-full border-t py-4 px-4 ring-0 outline-none">
            <Card.Title font="giorgio" className="flex gap-1 !text-[20px]">
              <span className="text-left">{title}</span>
              <div
                className={cn("ml-auto duration-200", open ? "rotate-180" : "")}
              >
                <Icons.chevron />
              </div>
            </Card.Title>
          </Disclosure.Button>
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="font-dm-sans text-base text-shark-50 font-normal leading-[140%] px-4">
              {description}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

Collapse.displayName = "Collapse";
export { Collapse };
