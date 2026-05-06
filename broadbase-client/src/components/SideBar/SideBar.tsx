import type { JSX } from "react";
import type { SideBarProps } from "@/types/props";

import Heading2 from "@/components/Heading2/Heading2";
import SeparatorText from "@/components/SeparatorText/SeparatorText";

import { useTheme } from "@/hooks/useTheme";

const SideBar = ({ isOpen, title, className, children }: SideBarProps): JSX.Element => {
  const { color, border } = useTheme();

  return (
    <aside
      className={`absolute right-0 top-0 flex flex-col justify-start gap-2 h-screen transition-all shadow-md overflow-hidden z-50 ${className} ${
        isOpen ? "w-full p-4 lg:w-[35%]" : "w-0 p-0 lg:w-0"
      }`}
    >
      <Heading2 className={color}>{title}</Heading2>
      <SeparatorText className={border}></SeparatorText>

      {children}
    </aside>
  );
};

export default SideBar;
