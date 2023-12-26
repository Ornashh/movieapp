import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Users, Image as ImageIcon, Video, MessagesSquare } from "lucide-react";

import { Credits } from "./credits";
import { Images } from "./images";
import { Videos } from "./videos";
import { Reviews } from "./reviews";

import { cn } from "@/utils/cn";

type Props = {
  id: number;
};

const tabList = [
  {
    title: "Credits",
    icon: <Users className="svg" />,
  },
  {
    title: "Images",
    icon: <ImageIcon className="svg" />,
  },
  {
    title: "Videos",
    icon: <Video className="svg" />,
  },
  {
    title: "Reviews",
    icon: <MessagesSquare className="svg" />,
  },
];

export const Tabs = ({ id }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-y-6">
      <Tab.Group selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <Tab.List className="border border-border rounded-xl flex p-1 overflow-hidden">
          {tabList.map(({ title, icon }, index) => {
            return (
              <Tab
                key={index}
                className={cn(
                  "rounded-lg flex justify-center items-center gap-x-3 w-full p-1.5 max-sm:text-sm",
                  activeTabIndex === index ? "bg-hover" : ""
                )}
              >
                {icon}
                <div className="max-md:hidden">{title}</div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Credits id={id} />
          </Tab.Panel>
          <Tab.Panel>
            <Images id={id} />
          </Tab.Panel>
          <Tab.Panel>
            <Videos id={id} />
          </Tab.Panel>
          <Tab.Panel>
            <Reviews id={id} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
