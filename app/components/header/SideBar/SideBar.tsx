import { NavLink } from "@remix-run/react";
import { NavItemDataType } from "../Header";

interface SideBarProps {
  data: NavItemDataType[];
  onClose: () => void;
}

export default function SideBar({ data, onClose }: SideBarProps) {
  return (
    <div className="fixed left-0 top-0 flex h-dvh w-screen flex-col bg-primary">
      <div onClick={onClose} className="self-end pr-5 pt-4 text-2xl text-white">
        X
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start gap-10 pt-20 text-xl text-white">
        {data.map((item, index) => (
          <NavLink to={item.link} key={index} onClick={onClose}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
