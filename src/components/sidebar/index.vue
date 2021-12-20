<script lang="ts" setup>
import { Menu, MenuItem } from "ant-design-vue";
import DIYMenu from "../menu/MySubMenu.vue";
import { ref } from "vue";
import type { MenuData } from "../menu/MySubMenu";

interface Props {
  menuData?: MenuData[];
}
const props = withDefaults(defineProps<Props>(), {
  menuData: () => {
    return [];
  },
});

const selectedKeys = ref<string[]>([""]);
const collapsed = ref<boolean>(true);
</script>

<template>
  <div>
    <div class="logo" />
    <Menu
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="collapsed"
      theme="dark"
      mode="inline"
    >
      <template v-for="item in menuData">
        <MenuItem v-if="item.children?.length === 0" :key="item.key">
          <template #icon><img style="width: 20px" :src="item.iconSrc" /></template>
          {{ item.title }}
        </MenuItem>
        <DIYMenu v-else :menuData="item" />
      </template>
    </Menu>
  </div>
</template>
<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
