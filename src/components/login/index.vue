<script setup lang="ts">
import { Button, Card, Form, FormItem, Input, Tabs, TabPane,Checkbox } from "ant-design-vue";
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import type { FormProps } from "ant-design-vue";

interface FormState {   //登录表单信息interface
  user: string
  password: string
  mobile: string
  verificationCode: string
}

//切换登录方式（1-账号密码登录 2-手机号登录）
const activeKey = ref("1");

const checked = ref(true)


const formState: UnwrapRef<FormState> = reactive({
  user: "",
  password: "",
  verificationCode: "",
  mobile: ""
});

const handleFinish: FormProps["onFinish"] = (values) => {
  console.log(values, formState)
};

const handleFinishFailed: FormProps["onFinishFailed"] = (errors) => {
  console.log(errors)
};
</script>

<template>
  <div style="backdrop-filter: blur(4px)">
    <Card class="login_body">
      <div class="logo_area">
        <img class="logo_area_img" alt="Vue logo" src="../../assets/logo.png" />
      </div>

      <Tabs v-model:activeKey="activeKey" centered animated>  
        <TabPane key="1" tab="账户密码登录">
          <Form
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
          >
            <FormItem>
              <Input placeholder="请输入用户名">
                <template #prefix
                  ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </Input>
            </FormItem>

            <FormItem>
              <Input
                v-model:value="formState.password"
                type="password"
                placeholder="请输入密码"
              >
                <template #prefix
                  ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane key="2" tab="手机号登录" force-render>
            <FormItem>
              <Input placeholder="请输入手机号" v-model:value="formState.mobile"> 
                <template #prefix
                  ><MobileOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </Input>
            </FormItem>

            <FormItem >
                <div style="width:350px;display: flex;justify-content:space-between">
                <div>
                <Input
                v-model:value="formState.verificationCode"
                
                placeholder="验证码"
                style="width:240px"
              >
                <template #prefix
                  ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </Input>
                </div>
                    

               <Button class="button" type="default">获取验证码</Button>
                
                </div>
              
            </FormItem>
        
        </TabPane>
      </Tabs>
      <div style="display: flex;justify-content:space-between">
        <Checkbox v-model:checked="checked" style="margin-top: 5px;">自动登录</Checkbox>
        <Button  type="link">忘记密码</Button>
      </div>
      <div class="button_group">
        <Button class="button" type="primary">登录</Button>
        <Button class="button" type="primary">注册</Button>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.logo_area {
  width: 100%;
  height: 100px;
  text-align: center;
  .logo_area_img {
    width: 80px;
  }
}

.login_body {
  width: 400px;
  height: 450px;
  box-shadow: 3px 3px 5px #5a5a5a;
}
.button_group {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .button {
    margin-top: 10px;
  }
}
</style>
