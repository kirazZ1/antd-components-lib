<script lang="ts" setup>
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Button } from "ant-design-vue";
import { useStore } from "@/store/index";
import { ref } from "vue";
import SideBar from "@/components/sidebar/index.vue";
import TagsBar from "@/components/tagsbar/index.vue";
import Avatar from "@/components/avatar/index.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { searchByRoutes } from "@/utils/func/index";

const router = useRouter();

const store = useStore();

/**每次加载页面根据当前路由设置ActiveTag */
let { Tags } = store.state.TagsBarModule;

Tags.forEach((item, index) => {
  if (item.route === router.currentRoute.value.path) {
    store.commit("TagsBarModule/CHANGE_ACTIVE_TAG", index);
  }
});

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
  let { route } = Tags[lastIndex];
  currentTags.splice(deleteIndex, 1);
  store.commit("TagsBarModule/UPDATE_TAGS", currentTags);

  router.push(route);
};

/**关闭所有标签的回调函数，对标签数组进行删除操作并进行路由跳转 */
const closeAllTagsCallback = () => {
  let { Tags } = store.state.TagsBarModule;
  let currentTags = [Tags[0]];
  let { route } = Tags[0];
  store.commit("TagsBarModule/UPDATE_TAGS", currentTags);

  router.push(route);
};

/**点击头像下拉菜单触发 */
const clickAvatarMenuItem = (item: any) => {
  console.log("clickItem", item);
};

/**收起/展开侧边栏 */
const collapsed = ref<boolean>(false);

const avatarMenu = [
  {
    key: 1,
    text: "查看用户信息",
  },
  {
    key: 2,
    text: "退出登录",
  },
];
</script>

<template>
  <Layout>
    <LayoutSider width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <SideBar :menuData="store.state.SideBarModule.sideBarData">
        <div style="display: flex">
          <div style="margin-left: 10px">
            <img src="../../assets/logo.png" alt="" style="width: 30px" />
          </div>
          <transition name="fade">
            <div
              style="margin-left: 20px; white-space: nowrap; user-select: none"
              v-if="!collapsed"
            >
              <h1 style="color: white; font-size: 25px; line-height: 32px">Antd Admin</h1>
            </div>
          </transition>
        </div>
      </SideBar>
    </LayoutSider>
    <Layout>
      <LayoutHeader class="header">
        <div>
          <Button type="text" shape="circle" @click="() => (collapsed = !collapsed)">
            <menu-unfold-outlined
              :class="!collapsed ? 'collapsed_icon_active' : 'collapsed_icon'"
            />
          </Button>
        </div>

        <div>
          <Avatar @clickItem="clickAvatarMenuItem" :menuData="avatarMenu" />
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

.collapsed_icon_active {
  transform: rotate(180deg);
}

.collapsed_icon {
  transform: rotate(0deg);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
