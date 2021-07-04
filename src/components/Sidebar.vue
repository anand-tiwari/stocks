<template>
    <nav class="sidebar"
         v-click-outside="hideSidebar"
         :class="{ 'show-sidebar' : visibleSidebar }">
      <MultiSelect />
    </nav>
</template>
<script src='./js/sidebar.js'></script>
<style lang="scss" scoped>
@import "~assets/css/_responsive.scss";
@import "~assets/css/_color.scss";

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.sidebar {
    width: 350px;
    height: 100vh;
    background-color: azure;
    position: sticky;
    z-index: 100;
    box-shadow: -1px 0px 2px 1px $font-black;
    padding: 5px 15px;
    transition: transform 0.3s ease-in;
    /* due to translate -100% it will be hidden complelety in the left side.*/
    transform: translate(-100%);
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: scroll;
    @include small() {
      width: 90vw;
    }
    @include medium() {
      width: 70vw;
    }
    @include large() {
      width: 400px;
    }
}

.sidebar li {
    list-style: none;
}

.show-sidebar {
    /* once we add translate 0 it will start visible again*/
    transform: translate(0);
}
</style>
