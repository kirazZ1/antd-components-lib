<script lang="ts" setup>
import { Menu, MenuItem } from "ant-design-vue";
import MySubMenu from "../menu/MySubMenu.vue";
import { ref } from "vue";
import type { MenuData } from "../menu/MySubMenu";
import { useRouter } from "vue-router";
interface Props {
  menuData?: MenuData[];
}
const props = withDefaults(defineProps<Props>(), {
  menuData: () => {
    return [];
  },
});

const router = useRouter();

const selectedKeys = ref<string[]>([""]);

const clickItem = (item: any) => {
  console.log(item);
  router.push(item.link);
};
</script>

<template>
  <div>
    <div class="logo" />
    <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <template v-for="item in menuData">
        <MenuItem
          v-if="item.children?.length === 0"
          :key="item.key"
          @click="clickItem(item)"
        >
          <template #icon><img style="width: 20px" :src="item.iconSrc" /></template>
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
  background: rgba(255, 255, 255, 0.3);
}
</style>
