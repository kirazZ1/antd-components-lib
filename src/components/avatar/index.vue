<!--
 * @Author: KiraZz1
 * @Date: 2021-12-25 09:59:07
 * @LastEditTime: 2021-12-25 12:00:24
 * @LastEditors: KiraZz1
 * @Description: 封装的Avatar组件
 * @FilePath: /antd-components-lib/src/components/avatar/index.vue
-->
<script lang="ts" setup>
import { Avatar, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { defineProps, defineEmits } from "vue";
import type { MenuData } from "./interface";

interface Props {
  imgUrl?: string;
  name?: string;
  menuData?: MenuData;
}

const props = withDefaults(defineProps<Props>(), {
  imgUrl: "src/assets/diana.jpeg",
  name: "嘉然今天吃什么",
  menuData: () => {
    return [];
  },
});

const emit = defineEmits(["clickItem"]);

/**
 * @description: 点击菜单中选项触发的事件（用自定义事件的方式传入父组件）
 * @param {item: any}
 * @return void
 */
const clickItem = (item: any) => {
  emit("clickItem", item);
};
</script>

<template>
  <Dropdown>
    <div class="avatar_main">
      <Avatar :size="30" :src="imgUrl">
        <template v-if="imgUrl === ''" #icon><UserOutlined /></template>
      </Avatar>
      <div>
        {{ name }}
      </div>
    </div>
    <template #overlay>
      <Menu>
        <MenuItem v-for="item in menuData" @click="clickItem(item)">
          <div>{{ item.text }}</div>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<style lang="scss" scoped>
.avatar_main {
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
</style>
