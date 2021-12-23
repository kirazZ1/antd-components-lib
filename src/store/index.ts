import { InjectionKey } from 'vue'
import {
    createStore, Store, useStore as baseUseStore
} from 'vuex'
import RootStateType, { AllStateTypes } from '@/store/interface'
import TagsBarModule from './modules/tagsbar'
import SideBarModule from './modules/sidebar'

export default createStore<RootStateType>({
    state: {},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        TagsBarModule,
        SideBarModule
    }


})



//该key在注册store时需要用到
export const key: InjectionKey<Store<any>> = Symbol('vue-store');

//为了简化问题，可以定义自己的组合式函数来检索类型化的 store
export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key);
}