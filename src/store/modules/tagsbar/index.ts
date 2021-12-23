import { Module } from "vuex";
import RootStateType from "@/store/interface";
import { TagsBarType } from "./interface";

const TagsBarModule: Module<TagsBarType, RootStateType> = {
  namespaced: true,
  state: {
    activeTag: 0,
    Tags: [
      {
        key: "1",
        text: "主页",
        route: "/dashboard/home",
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
