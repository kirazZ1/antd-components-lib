<script lang="ts" setup>
import { Button, Result } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleBack = () => {
  router.back();
};
</script>
<template>
  <Result status="404" title="404" sub-title="页面不存在">
    <template #extra>
      <Button type="primary" @click="handleBack">回到首页</Button>
    </template>
  </Result>
</template>
