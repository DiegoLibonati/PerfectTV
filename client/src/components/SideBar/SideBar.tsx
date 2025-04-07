import { SideBarProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const SideBar = ({ isOpen, title, children }: SideBarProps) => {
  const { bg, color, border } = useTheme();

  return (
    <aside
      className={`absolute right-0 top-0 flex flex-col justify-start gap-2 h-screen transition-all shadow-md overflow-hidden z-50 ${bg} ${
        isOpen ? "w-full p-4 lg:w-[35%]" : "w-0 p-0 lg:w-0"
      }`}
    >
      <h2 className={`text-xl font-semibold ${color}`}>{title}</h2>
      <hr className={`block h-1 border-0 border-t-[.2rem] p-0 ${border}`}></hr>

      {children}
    </aside>
  );
};
