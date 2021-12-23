import { SideBarType } from "./modules/sidebar/interface"
import { TagsBarType } from "./modules/tagsbar/interface"
/** root层state类型定义 */
export default interface RootStateType {
    
}

/** vuex所有模块state类型定义集成 */
export interface AllStateTypes extends RootStateType {
    SideBarModule: SideBarType,
    TagsBarModule: TagsBarType
}