<!--
 * @Author: KiraZz1
 * @Date: 2021-12-20 11:23:57
 * @LastEditTime: 2021-12-25 12:02:10
 * @LastEditors: KiraZz1
 * @Description: 使用递归组件的形式实现了根据树形JSON数据显示多级菜单项
 * @FilePath: /antd-components-lib/src/components/menu/MySubMenu.vue
-->
<script lang="ts" setup>
import { defineProps } from "vue";
import { SubMenu, MenuItem } from "ant-design-vue";
import type { MenuData } from "./MySubMenu";

interface Props {
  menuData?: MenuData;
  clickItem?: (...args: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  menuData: () => {
    return {};
  },
  clickItem: () => {},
});
</script>

<template>
  <SubMenu :title="menuData.title" :key="menuData.key">
    <template #icon><img style="width: 20px" :src="menuData.iconSrc" /></template>
    <div v-for="item in menuData.children">
      <MenuItem
        v-if="item.children?.length === 0"
        :key="item.key"
        @click="clickItem(item)"
      >
        <template #icon><img style="width: 20px" :src="item.iconSrc" /></template>
        {{ item.title }}
      </MenuItem>
      <mySubMenu v-else :menuData="item" :clickItem="clickItem" />
    </div>
  </SubMenu>
</template>
