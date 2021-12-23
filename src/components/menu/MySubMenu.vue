<script lang="ts" setup>
import { defineProps } from "vue";
import { SubMenu, MenuItem } from "ant-design-vue";
import type { MenuData } from "./MySubMenu";
import { PieChartOutlined } from "@ant-design/icons-vue";
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
