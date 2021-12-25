<!--
 * @Author: KiraZz1
 * @Date: 2021-12-22 16:08:09
 * @LastEditTime: 2021-12-25 12:04:24
 * @LastEditors: KiraZz1
 * @Description: 使用Antd的Tags封装的标签页栏组件
 * @FilePath: /antd-components-lib/src/components/tagsbar/index.vue
-->
<script lang="ts" setup>
import { Tag, Button } from "ant-design-vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { ref, defineProps } from "vue";

interface Props {
  tagsData?: Array<any>;
  activeTag?: number;
  clickTagCallback?: (item: any) => void; //点击切换tags的回调
  handleCloseTagCallback?: (deleteIndex: number, e: any) => void; //点击关闭单个tag的回调
  closeAllTagsCallback?: () => void; //点击关闭所有tag的回调
}

const props = withDefaults(defineProps<Props>(), {
  tagsData: () => {
    return [];
  },
  activeTag: 0,
  clickTagCallback: (item: any) => {},
  handleCloseTagCallback: (deleteIndex: number, e: any) => {},
  closeAllTagsCallback: () => {},
});

const handleCloseTag = (key: any) => {
  let deleteIndex = 0;
  let lastIndex = 0;
  props.tagsData.forEach((item, index) => {
    if (item.key === key) {
      deleteIndex = index;
      if (index > 0) lastIndex = index - 1;
    }
  });
  props.handleCloseTagCallback(deleteIndex, lastIndex);
};

const moveTagsScroller = (action: "left" | "right") => {
  let tagsbar = document.getElementById("tagbar");
  switch (action) {
    case "left":
      if (tagsbar !== null && tagsbar.scrollLeft >= 0)
        tagsbar.scrollLeft = tagsbar.scrollLeft - 50;
      break;
    default:
      if (tagsbar !== null) tagsbar.scrollLeft = tagsbar.scrollLeft + 50;
      break;
  }
};

const clickTag = (index: number, item: any) => {
  props.clickTagCallback(item);
};

const closeAllTags = () => {
  scrollButtonVisible.value = false;
  props.closeAllTagsCallback();
};

const scrollButtonVisible = ref<Boolean>(false);
</script>

<template>
  <div class="tags-bar">
    <div class="tags-bar-left">
      <div class="tags-bar-tags" id="tagbar">
        <Tag
          style="transform: scale(1.2); margin: 5px 10px"
          v-for="(item, index) in tagsData"
          :key="item.key"
          @close="handleCloseTag(item.key)"
          @click="clickTag(index, item)"
          :color="activeTag !== index ? '#d9d9d9' : '#1890ff'"
          :closable="item.closable"
          >{{ item.text }}</Tag
        >
      </div>

      <div class="tags-bar-buttons-scoll">
        <Button
          type="text"
          v-show="scrollButtonVisible"
          @click="moveTagsScroller('left')"
          class="tags-bar-button"
          ><LeftOutlined style="color: #ababab"
        /></Button>
        <Button
          type="text"
          v-show="scrollButtonVisible"
          @click="moveTagsScroller('right')"
          class="tags-bar-button"
          ><RightOutlined style="color: #ababab"
        /></Button>
      </div>
    </div>
    <div class="tags-bar-right">
      <Button type="primary" style="margin: 5px 10px" size="small" @click="closeAllTags"
        >关闭所有标签页</Button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tags-bar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid rgb(241, 241, 241);
  .tags-bar-left {
    display: flex;
    width: 80%;
    .tags-bar-tags {
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 10px;
        height: 3px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fdfdfd;
      }
    }
    .tags-bar-buttons-scoll {
      display: flex;
      margin-left: 20px;
      width: 25%;
      .tags-bar-button {
        width: 20px;
        padding: 0 1px;
        border: 1px solid #f1f1f1;
      }
    }
  }
  .tags-bar-right {
    width: 150px;
  }
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
