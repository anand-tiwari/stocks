<template>
  <div class="checkbox-form">
    <div class="checkbox-form__header">ISIN Filter</div>
    <div class="checkbox-form__input">
      <input type="text" class="checkbox-form__search-field input-effect"
            placeholder="Search ISIN"
            v-model="search"/>
      <span class="focus-border"></span>
    </div>
    <div class="checkbox-form__data">
        <label
          v-for="option of filteredItems"
          :key="option"
          class="item">
          <span :for="option">{{ option }}</span>
          <input
            :id="option"
            v-model="checked"
            type="checkbox"
            :value="option"
            @click="updateFilter(option, $event.target.checked)">
          <span class="checkmark" />
        </label>
    </div>
  </div>
</template>
<script src='./js/multi-select.js'></script>
<style lang="scss" scoped>
@import "~assets/css/_responsive.scss";
@import "~assets/css/_color.scss";
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.checkbox-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    width: 100%;
    padding: 10px 0;
  }
  &__input {
    margin: 10px 0;
    position: relative;
    width: 100%;
  }
  &__data{
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
    overflow-y: auto;
    height: 82vh;
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

.checkbox-form label {
  margin-left: 1em;
}

.checkbox-form__search-field{
  padding: 4px 0;
  margin: 0;
  position: relative;
}

.checkbox-form .item {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-left: 0;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1em;
  height: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
}

.checkbox-form .item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-form .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: $gray;
}

.checkbox-form .item:hover input ~ .checkmark {
  background-color: $gray-dark;
}

.checkbox-form .item input:checked ~ .checkmark {
  background-color: $yellow;
}

.checkbox-form .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-form .item input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-form .item .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid $white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.input-effect{
    border: 0;
    padding: 7px 0;
    border-bottom: 1px solid $gray;
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
