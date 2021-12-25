<!--
 * @Author: KiraZz1
 * @Date: 2021-12-20 09:45:55
 * @LastEditTime: 2021-12-25 12:01:19
 * @LastEditors: KiraZz1
 * @Description: 封装的侧边栏组件
 * @FilePath: /antd-components-lib/src/components/sidebar/index.vue
-->
<script lang="ts" setup>
import { Menu, MenuItem } from "ant-design-vue";
import MySubMenu from "../menu/MySubMenu.vue";
import { ref, watch } from "vue";
import type { MenuData } from "../menu/MySubMenu";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import { searchByRoutes } from "@/utils/func/index";
interface Props {
  menuData?: MenuData[];
}
const props = withDefaults(defineProps<Props>(), {
  menuData: () => {
    return [];
  },
});

const router = useRouter();

const store = useStore();
console.log(store.state.TagsBarModule);

watch(
  () => store.state.TagsBarModule.activeTag,
  (newVal: any) => {
    const Tags = store.state.TagsBarModule.Tags;
    const { route } = Tags[newVal];
    let { key } = searchByRoutes(route, store.state.SideBarModule.sideBarData);
    selectedKeys.value = [key];
  }
);

const selectedKeys = ref<string[]>([""]);

const clickItem = (item: any) => {
  console.log(item);
  router.push(item.link);
};
</script>

<template>
  <div>
    <div class="logo">
      <slot></slot>
    </div>
    <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <template v-for="item in menuData">
        <MenuItem
          v-if="item.children?.length === 0"
          :key="item.key"
          @click="clickItem(item)"
        >
          <template #icon>
            <img style="width: 20px" :src="item.iconSrc" />
          </template>
          {{ item.title }}
        </MenuItem>
        <MySubMenu v-else :menuData="item" :clickItem="clickItem" />
      </template>
    </Menu>
  </div>
</template>
<style lang="scss" scoped>
.logo {
  height: 32px;
  margin: 16px;
  // background: rgba(255, 255, 255, 0.3);
}
</style>
