<template>
    <div class="waterfall">
      <div v-for="item in list"
      :key="item.id"
      class="card"
      :style="{ height: item.height + 'px' }"
      >{{ item.id }}</div>
    </div>
  </template>

<script>
export default {
  name: 'WaterfallCard',
  data () {
    return {
      list: [
        { id: 1, height: 50 },
        { id: 2, height: 70 },
        { id: 3, height: 60 },
        { id: 4, height: 30 },
        { id: 5, height: 50 },
        { id: 6, height: 70 }
      ]
    }
  },
  mounted () {
    const cards = document.querySelectorAll('.card')
    Array.from(cards).forEach(element => {
      const row = Math.ceil(element.clientHeight / 5) + 2
      element.style.gridRowEnd = 'span ' + row
    })
  }
}

</script>
<style lang="less" scoped>
.waterfall {
    box-sizing: border-box;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 8px));  // 修改为两列布局
    align-items: start;
    justify-content: space-evenly;
    grid-auto-rows: 5px;
    .card {
        background-color: pink;
        padding: 7px; // 添加底部间距
    }
}
  </style>
