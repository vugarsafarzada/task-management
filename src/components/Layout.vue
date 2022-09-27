<template>
    <div id="layout-container">
        <Header />
        <slot></slot>
        footer
    </div>
</template>

<script>
import Header from "./Header.vue";
export default {
    name: "Layout",
    components: { Header }
}

</script>

<style scoped>

</style>