<template>
    <div id="header-container" class="flex-row-space-between-center">
        <div class="header-logo no-select">
            <router-link to="/">
                <i class="fi fi-rr-edit icon-custom-style"></i> Task Management
            </router-link>
        </div>
        <div class="create-task">
            <router-link v-if="$route.path !=='/create'" to="/create">
                <i class="fi fi-rs-add icon-custom-style"></i> <span class="hide-on-mobile">Yeni tapşırıq</span>
            </router-link>
            <router-link v-if="$route.path !=='/'" to="/">
                <i class="fi fi-rr-apps-add icon-custom-style"></i> <span class="hide-on-mobile">Bütün
                    tapşırıqlar</span>
            </router-link>
        </div>
    </div>
</template>
<script>

</script>

<style scoped>
#header-container {
    background: var(--color-blue-gradient);
    width: 100%;
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

#header-container .create-task a span {
    font-weight: 500;
    color: var(--color-main-white);
}

@media screen and (max-width: 800px) {
    #header-container {
        width: 100%;
    }

    #header-container .header-logo a {
        color: var(--color-main-white);
        font-size: 18px;
        font-weight: 700;
    }
}
</style>
