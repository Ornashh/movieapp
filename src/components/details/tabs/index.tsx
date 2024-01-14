import { Users, Image as ImageIcon, Video, MessagesSquare } from "lucide-react";

import { Credits } from "./credits";
import { Images } from "./images";
import { Videos } from "./videos";
import { Reviews } from "./reviews";

import {
  Tabs as RootTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Props = {
  id: number;
};

const tabList = [
  {
    title: "Cast",
    value: "cast",
    icon: <Users className="svg" />,
  },
  {
    title: "Images",
    value: "images",
    icon: <ImageIcon className="svg" />,
  },
  {
    title: "Videos",
    value: "videos",
    icon: <Video className="svg" />,
  },
  {
    title: "Reviews",
    value: "reviews",
    icon: <MessagesSquare className="svg" />,
  },
];

export const Tabs = ({ id }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <RootTabs defaultValue="cast">
        <TabsList>
          {tabList.map(({ title, value, icon }, index) => {
            return (
              <TabsTrigger key={index} value={value} className="gap-x-3">
                {icon}
                <div className="max-md:hidden">{title}</div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="cast">
          <Credits id={id} />
        </TabsContent>
        <TabsContent value="images">
          <Images id={id} />
        </TabsContent>
        <TabsContent value="videos">
          <Videos id={id} />
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews id={id} />
        </TabsContent>
      </RootTabs>
    </div>
  );
};
