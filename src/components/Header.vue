<template>
    <div id="header-container" class="flex-row-space-between-center">
        <div class="header-logo no-select">
            <router-link to="/">
                Task Management
            </router-link>
        </div>
        <div class="create-task">
            <router-link to="/create">
                Create task
            </router-link>
        </div>
    </div>
</template>
<script>

</script>

<style scoped>
#header-container {
    background: var(--color-blue-gradient);
    width: 100vw;
    height: 60px;
}

#header-container>div {
    padding: 20px;
}

#header-container .header-logo a {
    color: var(--color-main-white);
    font-size: 25px;
    font-weight: 700;
}

#header-container .create-task a {
    font-weight: 500;
}
</style>
