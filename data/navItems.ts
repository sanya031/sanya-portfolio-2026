export type NavItem = {
  id: string;
  label: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  {
    id: "work",
    label: "Work",
    href: "#work",
    iconSrc: "/assets/work_folder.svg",
    iconAlt: "",
  },
  {
    id: "intro",
    label: "About",
    href: "#intro",
    iconSrc: "/assets/about_flower.svg",
    iconAlt: "",
  },
  {
    id: "resume",
    label: "Resume",
    href: "/assets/Sanya-Malhotra-Resume.pdf",
    iconSrc: "/assets/Resume_paper%20(1).svg",
    iconAlt: "",
    external: true,
  },
];
