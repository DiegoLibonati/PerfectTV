import { SideBarProps } from "@/src/entities/props";

import { Heading2 } from "@/src/components/Heading2/Heading2";
import { SeparatorText } from "@/src/components/SeparatorText/SeparatorText";

import { useTheme } from "@/src/hooks/useTheme";

export const SideBar = ({
  isOpen,
  title,
  className,
  children,
}: SideBarProps) => {
  const { color, border } = useTheme();

  return (
    <aside
      className={`absolute right-0 top-0 flex flex-col justify-start gap-2 h-screen transition-all shadow-md overflow-hidden z-50 ${className} ${
        isOpen ? "w-full p-4 lg:w-[35%]" : "w-0 p-0 lg:w-0"
      }`}
    >
      <Heading2 className={`${color}`}>{title}</Heading2>
      <SeparatorText className={`${border}`}></SeparatorText>

      {children}
    </aside>
  );
};
