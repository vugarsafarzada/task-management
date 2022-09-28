<template>
    <div id="layout-container" class="flex-column-center-center">
        <Header />
        <div class="page-container">
            <slot></slot>
        </div>
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