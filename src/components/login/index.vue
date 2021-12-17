<script setup lang="ts">
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    InputPassword,
    Tabs,
    TabPane,
    Checkbox,
    Spin,
    message,
} from "ant-design-vue";
import {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    ReloadOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, h } from "vue";
import { FormState } from "./interface";
import { rules, logoImg } from "./utils";
import type { UnwrapRef } from "vue";


//切换登录方式（1-账号密码登录 2-手机号登录）
const activeKey = ref("1");

//自动登录Checkbox是否选中
const checked = ref(false);

//手机验证码登录的表单Ref
const mobileLoginFormRef = ref();

//账号密码登录的表单Ref
const accountLoginFormRef = ref();

//数据表单（两种登录方式共用一个formState）
const formState: UnwrapRef<FormState> = reactive({
    user: "",
    password: "",
    verificationCode: "",
    mobile: "",
});

/**
 * 更换原始Spin图标
 */
const indicator = h(ReloadOutlined, {
    style: {
        fontSize: "30px",
    },
    spin: true,
});

//是否触发spin
const spinning = ref(false);

/**
 * 重置表单内容
 */
const resetForm = () => {
    accountLoginFormRef.value.clearValidate()
    accountLoginFormRef.value.resetFields()
    mobileLoginFormRef.value.clearValidate()
    mobileLoginFormRef.value.resetFields()
};

/**
 * 切换页签触发的回调
 */
const changeTabs = () => {
    resetForm();
};

/**
 * 提交登陆表单
 */
const submit = async () => {
    try {
        //检验表单
        if (activeKey.value === "1") {
            await accountLoginFormRef.value.validateFields()
        } else {
            await mobileLoginFormRef.value.validateFields()
        }
        spinning.value = true;
        setTimeout(() => {
            spinning.value = false;
        }, 2000);
    } catch (e: any) {
        let { errorFields } = e
        let { errors = [] } = { ...errorFields[0] }
        spinning.value = false;
        message.error(`${errors[0]}`)
    }


};
</script>

<template>
    <div>
        <Card class="login_body">
            <div class="logo_area">
                <img class="logo_area_img" alt="Vue logo" :src="logoImg" />
            </div>
            <Spin tip="登录中..." size="large" :indicator="indicator" :spinning="spinning">
                <Tabs v-model:activeKey="activeKey" @change="changeTabs" centered animated>
                    <TabPane key="1" tab="账户密码登录">
                        <Form ref="accountLoginFormRef" :rules="rules" :model="formState">
                            <FormItem name="user">
                                <Input placeholder="请输入用户名" v-model:value="formState.user">
                                    <template #prefix>
                                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                    </template>
                                </Input>
                            </FormItem>
                            <FormItem name="password">
                                <InputPassword
                                    v-model:value="formState.password"
                                    type="password"
                                    placeholder="请输入密码"
                                >
                                    <template #prefix>
                                        <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                    </template>
                                </InputPassword>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane key="2" tab="手机号登录" force-render>
                        <Form ref="mobileLoginFormRef" :rules="rules" :model="formState">
                            <FormItem name="mobile">
                                <Input placeholder="请输入手机号" v-model:value="formState.mobile">
                                    <template #prefix>
                                        <MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                    </template>
                                </Input>
                            </FormItem>

                            <FormItem name="verificationCode">
                                <div class="login_verification_code">
                                    <div>
                                        <Input
                                            v-model:value="formState.verificationCode"
                                            placeholder="验证码"
                                            style="width: 240px"
                                        >
                                            <template #prefix>
                                                <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                            </template>
                                        </Input>
                                    </div>

                                    <Button class="button" type="default">获取验证码</Button>
                                </div>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
                <div class="login_option_group">
                    <Checkbox v-model:checked="checked">自动登录</Checkbox>
                    <!-- <Button type="link">忘记密码</Button> -->
                    <a>忘记密码</a>
                </div>
                <div class="button_group">
                    <Button class="button" type="primary" @click.prevent="submit">登录</Button>
                    <Button class="button" type="primary">注册</Button>
                </div>
            </Spin>
        </Card>
    </div>
</template>

<style lang="scss" scoped>
.login_body {
    width: 400px;
    height: 450px;
    box-shadow: 3px 3px 5px #5a5a5a;
    .logo_area {
        width: 100%;
        height: 100px;
        text-align: center;
        .logo_area_img {
            width: 80px;
        }
    }
    .login_option_group {
        display: flex;
        justify-content: space-between;
    }

    .login_verification_code {
        width: 350px;
        display: flex;
        justify-content: space-between;
    }
    .button_group {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .button {
            margin-top: 10px;
        }
    }
}
</style>
