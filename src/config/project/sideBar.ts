import { SideBarItem } from "@/store/modules/sidebar/interface"
export const sideBar:Array<SideBarItem> = [
    {
      key: "1",
      title: "主页",
      iconSrc: "src/assets/icons/svg/user.svg",
      link: "/dashboard/home",
      children: [],
    },
    {
      key: "2",
      title: "表格",
      iconSrc: "src/assets/icons/svg/table.svg",
      link: "/dashboard/table",
      children: [],
    },
    {
      key: "3",
      title: "404",
      iconSrc: "src/assets/icons/svg/error-fill.svg",
      link: "/dashboard/404",
      children: [],
    },
    {
      key: "4",
      title: "用户",
      iconSrc: "src/assets/icons/svg/error-fill.svg",
      link: "/dashboard/user",
      children: [],
    },
  ]