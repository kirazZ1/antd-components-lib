/**标签栏各项属性类型 */
type TagsItem = {
    key?: string,
    text?: string,
    route?: string,
    closable?: boolean
}



export interface TagsBarType {
    activeTag?: number;
    Tags?:Array<TagsItem>; 
}

