<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  LayoutFooter,
  Avatar,
  Menu,
  MenuItem,
} from "ant-design-vue";
import { ref } from "vue";
import SideBar from "../../components/sidebar/index.vue";
const collapsed = ref<boolean>(false);

const sideBar = [
  {
    key: "1",
    title: "用户管理",
    iconSrc: "src/assets/icons/svg/user.svg",
    children: [
      {
        key: "1-1",
        title: "查看用户信息",
        iconSrc: "src/assets/icons/svg/order.svg",
        children: [],
      },
      {
        key: "1-2",
        title: "编辑用户信息",
        iconSrc: "src/assets/icons/svg/order.svg",
        children: [],
      },
      {
        key: "1-3",
        title: "历史操作信息",
        iconSrc: "src/assets/icons/svg/order.svg",
        children: [],
      },
    ],
  },
  {
    key: "2",
    title: "订单管理",
    iconSrc: "src/assets/icons/svg/order.svg",
    children: [],
  },
];
</script>

<template>
  <Layout>
    <LayoutSider width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <SideBar :menuData="sideBar" />
    </LayoutSider>
    <Layout>
      <LayoutHeader
        style="
          background: #fff;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
        "
      >
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
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style scope>
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

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
