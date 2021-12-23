<script lang="ts" setup>
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Avatar } from "ant-design-vue";
import { useStore } from "../../store/index";
import { ref } from "vue";
import SideBar from "../../components/sidebar/index.vue";
import TagsBar from "../../components/tagsbar/index.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();

const store = useStore();

/**每次加载页面根据当前路由设置ActiveTag */
let { Tags } = store.state.TagsBarModule;
Tags.forEach((item, index) => {
  if (item.route === router.currentRoute.value.path) {
    store.commit("TagsBarModule/CHANGE_ACTIVE_TAG", index);
  }
});

/**根据路由搜索标题 */
const searchByRoutes = (route: string, sidebar: Array<any>) => {
  for (let i = 0; i < sidebar.length; i++) {
    if (sidebar[i]?.link === route) return sidebar[i];
    if (sidebar[i]?.children?.length !== 0) {
      return searchByRoutes(route, sidebar[i]?.children);
    }
  }
  return null;
};

/**根据路由跳转情况来进行标签栏的改变 */
onBeforeRouteUpdate((to) => {
  let { path } = to;
  let { Tags } = store.state.TagsBarModule;
  let flag = true;
  Tags.forEach((item, index) => {
    if (item.route === path) {
      store.commit("TagsBarModule/CHANGE_ACTIVE_TAG", index);
      flag = false;
      return;
    }
  });
  if (flag) {
    //如果该页面没有被打开过，需要新增一个标签（标签的key采用sidebar对应项的key）
    let currentTags = [...Tags];
    let { title, key } = searchByRoutes(path, store.state.SideBarModule.sideBarData);
    currentTags.push({
      key: key,
      route: path,
      text: title,
      closable: true,
    });
    store.commit("TagsBarModule/UPDATE_TAGS", currentTags);
    store.commit("TagsBarModule/CHANGE_ACTIVE_TAG", currentTags.length - 1);
  }
});

/**点击标签的回调函数，进行对应的路由跳转 */
const clickTagCallback = (item: any) => {
  let { route } = item;
  router.push(route);
};

/**关闭标签的回调函数，对标签数组进行删除操作并进行路由跳转 */
const handleCloseTagCallback = (deleteIndex: number, lastIndex: number) => {
  let currentTags = [...store.state.TagsBarModule.Tags];
  let { Tags } = store.state.TagsBarModule;

  currentTags.splice(deleteIndex, 1);
  store.commit("TagsBarModule/UPDATE_TAGS", currentTags);

  let { route } = Tags[lastIndex];
  router.push(route);
};

/**关闭所有标签的回调函数，对标签数组进行删除操作并进行路由跳转 */
const closeAllTagsCallback = () => {
  let { Tags } = store.state.TagsBarModule;
  let currentTags = [Tags[0]];

  store.commit("TagsBarModule/UPDATE_TAGS", currentTags);
  let { route } = Tags[0];
  router.push(route);
};

const collapsed = ref<boolean>(false);
</script>

<template>
  <Layout>
    <LayoutSider width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <SideBar :menuData="store.state.SideBarModule.sideBarData" />
    </LayoutSider>
    <Layout>
      <LayoutHeader class="header">
        <div>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>

        <div>
          <Avatar :size="30">
            <template #icon><UserOutlined /></template>
          </Avatar>
        </div>
      </LayoutHeader>
      <LayoutContent
        :style="{
          padding: '2px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <TagsBar
          :tagsData="store.state.TagsBarModule.Tags"
          :activeTag="store.state.TagsBarModule.activeTag"
          :clickTagCallback="clickTagCallback"
          :handleCloseTagCallback="handleCloseTagCallback"
          :closeAllTagsCallback="closeAllTagsCallback"
        />
        <router-view></router-view>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style scoped>
.ant-layout.ant-layout-has-sider {
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.header {
  background: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  white-space: nowrap;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
