<script lang="ts" setup>
import Login from '../../components/login/index.vue'

</script>

<template>
    <div class="main">
        <Login/>
    </div>

</template>

<style  scoped lang="scss">
.main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/login_default_bg.jpeg');
    background-size: cover;
    
}
</style>