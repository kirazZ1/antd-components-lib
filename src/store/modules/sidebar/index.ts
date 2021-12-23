import { Module } from "vuex";
import RootStateType from "@/store/interface";
import { SideBarType } from "./interface";
import { sideBar } from "@/config/project/sideBar"
const SideBarModule: Module<SideBarType, RootStateType> = {
  namespaced: true,
  state: {
    sideBarData: [...sideBar],
  },
  mutations: {
    UPDATE_SIDEBAR(state, payload) {
      state.sideBarData = [...payload];
    },
  },
  actions: {},
};

export default SideBarModule;
