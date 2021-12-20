
export type MenuData = {
    key?: string;
    title?: string;
    children?: MenuData[];
    iconSrc?:string;
};

// 定义props属性
export interface Props {
    menuData?: MenuData;
}
  