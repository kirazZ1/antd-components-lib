
export interface SideBarType{
    sideBarData?:Array<SideBarItem>
}

export interface SideBarItem {
    key?: string,
    title?: string,
    iconSrc?: string,
    link?: string,
    children?: Array<SideBarItem>,
}