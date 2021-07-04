<template>
    <div class="stock">
        <table class="stock__table">
            <thead>
                <tr class="stock__header">
                    <td :key="field" v-for="field in headerlist">{{field}}</td>
                </tr>
            </thead>
            <tbody>
                <tr class="stock__info" :key="stock.isin" v-for="stock in stocks">
                    <td>{{stock.isin}}</td>
                    <td>{{stock.price}}</td>
                    <td>{{stock.bid}}</td>
                    <td>{{stock.ask}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script src='./js/stock.js'></script>
<style lang="scss" scoped>
@import "~assets/css/_responsive.scss";
@import "~assets/css/_color.scss";
.stock{
  &__table{
      width: 100%;
  }
  &__header{
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 16px -4px $black-shadow;
    padding: 7px;
    box-sizing: border-box;
    td {
        width: 25%;
        padding: 12px 12px;
        box-sizing: border-box;
        @include small() {
          width: 50%;
          padding: 12px 0;
        }
    }
    border-bottom: 2px solid #F2F2F3;
    background-color: #F2F2F3;
    font-size: 16px;
    font-weight: lighter;
  }
  &__info{
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 16px -4px $black-shadow;
    padding: 7px;
    box-sizing: border-box;
    margin: 2px 0;
    td {
        width: 25%;
        padding: 12px 12px;
        box-sizing: border-box;
        @include small() {
          width: 50%;
          padding: 12px 0;
        }
    }
    border-bottom: 2px solid #F2F2F3;
  }
}

</style>
