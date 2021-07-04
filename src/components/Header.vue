<template>
    <div class="header">
        <div @click="openSidebar"
            class="header__filter open-sidebar">
          <img src="@/assets/images/svg/filter.svg"
              alt="sort"
              class="open-sidebar" />
        </div>
        <div class="header__search-box">
          <input type="text"
            class="input-effect"
            placeholder="Enter ISIN"
            v-model="searchTerm"
            v-on:keyup.enter="onInput"/>
            <span class="focus-border"></span>
        </div>
    </div>
</template>
<script src='./js/header.js'></script>
<style lang="scss" scoped>
@import "~assets/css/_responsive.scss";
@import "~assets/css/_color.scss";
.header {
    display: flex;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  &__filter{
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  &__search-box {
    box-sizing: border-box;
    position: relative;
    @include small() {
      width: 80%;
    }
    input {
      width: 100%;
    }
  }
}
input[type="text"]{
  font: 15px/24px "Lato", Arial, sans-serif;
  color: $font-black;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}
:focus{outline: none;}

.input-effect{
    border: 0;
    padding: 7px 0;
    border-bottom: 1px solid $gray-dark;
    margin-bottom: 0;
    width: 100%;
}

.input-effect ~ .focus-border{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: $blue;
  transition: 0.4s;
}
.input-effect:focus ~ .focus-border{
  width: 100%;
  transition: 0.4s;
}
</style>
