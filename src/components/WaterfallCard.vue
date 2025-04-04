<template>
  <div class="waterfall-container">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :head-height="50"
      success-text="刷新成功"
      animation-duration="300"
      class="pull-refresh-container"
    >
      <div class="waterfall">
        <div v-for="item in list"
          :key="item.id"
          class="card"
          ref="card"
        >
          <div class="card-content">
            <div class="image-wrapper">
              <img :src="item.url" :alt="item.title" class="card-image" @load="handleImageLoad">
            </div>
            <div class="card-info">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.description }}</p>
              <div class="user-info">
                <div class="user">
                  <img src="@/assets/头像.png" alt="用户头像" class="user-avatar">
                  <span class="user-id">{{ item.userId }}111</span>
                </div>
                <button class="like-button">👍</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <!-- Loading 提示 -->
    <div class="loading-tip" v-show="isLoading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <!-- 触底提示 -->
    <div class="bottom-tip" v-show="isBottom">
      没有更多内容了
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading, PullRefresh } from 'vant'

export default {
  name: 'WaterfallCard',
  components: {
    [Loading.name]: Loading,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      list: [],
      isLoading: false,
      page: 1,
      isBottom: false,
      scrollTimer: null,
      refreshing: false
    }
  },
  methods: {
    // 获取瀑布流数据
    async fetchData () {
      try {
        this.isLoading = true
        const response = await axios.get('/api/waterfall', {
          params: {
            page: this.page
          }
        })
        if (response.data.code === 200) {
          if (response.data.data.length === 0) {
            this.isBottom = true
          } else {
            this.list = [...this.list, ...response.data.data]
            this.page++
          }
        }
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.isLoading = false
      }
    },
    // 处理图片加载完成事件
    handleImageLoad (event) {
      const img = event.target
      const card = img.closest('.card')
      const cardInfo = card.querySelector('.card-info')

      // 获取图片实际高度和 card-info 高度
      const imgHeight = img.clientHeight
      const infoHeight = cardInfo.clientHeight

      // 设置卡片总高度
      const totalHeight = imgHeight + infoHeight
      card.style.height = totalHeight + 'px'

      // 更新网格布局
      const row = Math.ceil(totalHeight / 23) + 2
      card.style.gridRowEnd = 'span ' + row
    },
    // 检查是否触底
    checkScrollBottom () {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight

      // 距离底部 100px 时触发加载
      if (scrollHeight - scrollTop - clientHeight < 100 && !this.isLoading && !this.isBottom) {
        this.fetchData()
      }
    },
    // 防抖处理
    debounce (fn, delay) {
      return () => {
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer)
        }
        this.scrollTimer = setTimeout(() => {
          fn()
        }, delay)
      }
    },
    async onRefresh () {
      try {
        this.page = 1
        this.isBottom = false
        this.list = []

        await this.fetchData()
      } catch (error) {
        console.error('刷新失败:', error)
      } finally {
        this.refreshing = false
      }
    }
  },
  mounted () {
    this.fetchData()
    // 添加滚动监听，使用防抖处理
    window.addEventListener('scroll', this.debounce(this.checkScrollBottom, 200))
  },
  beforeDestroy () {
    // 移除滚动监听
    window.removeEventListener('scroll', this.debounce(this.checkScrollBottom, 200))
  }
}
</script>

<style lang="less" scoped>
.waterfall-container {
  position: relative;
  min-height: 100vh;
}

.waterfall {
  box-sizing: border-box;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 8px));
  align-items: start;
  justify-content: space-evenly;
  grid-auto-rows: 4px;
  gap: 16px;
  padding: 16px;

  .card {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .card-content {
      display: flex;
      flex-direction: column;

      .image-wrapper {
        width: 100%;
        overflow: hidden;
        .card-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }
      }

      .card-info {
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .card-title {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-desc {
          margin: 4px 0;
          font-size: 12px;
          color: #999;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .user-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .user-id {
          font-size: 12px;
          color: #666;
        }

        .like-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }
}

.loading-tip {
  text-align: center;
  padding: 20px 0;
  color: #999;
}

.bottom-tip {
  text-align: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}

.pull-refresh-container {
  overflow: visible;
  text-align: center;
  position: relative;
  :deep(.van-pull-refresh__track) {
    overflow: visible;
  }

  :deep(.van-pull-refresh__head) {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin-bottom: -10px;
    text-align: center; // 确保文字居中
  }
}
</style>
