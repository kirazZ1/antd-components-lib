import { Module } from "vuex";
import RootStateType from "@/store/interface";
import { TagsBarType } from "./interface";
import { sideBar } from "@/config/project/sideBar";
const TagsBarModule: Module<TagsBarType, RootStateType> = {
  namespaced: true,
  state: {
    activeTag: 0,
    Tags: [
      {
        key: sideBar[0].key || "1",
        text: sideBar[0].title || "主页",
        route: sideBar[0].link || "/dashboard/home",
        closable: false,
      },
    ],
  },
  mutations: {
    CHANGE_ACTIVE_TAG(state, payload) {
      state.activeTag = payload;
    },
    UPDATE_TAGS(state, payload) {
      state.Tags = [...payload];
    },
  },
  actions: {},
};

export default TagsBarModule;
