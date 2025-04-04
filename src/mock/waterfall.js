import Mock from 'mockjs'

// 生成随机图片数据
const generateImageData = (count) => {
  const images = []
  for (let i = 0; i < count; i++) {
    images.push({
      id: Mock.Random.integer(1, 1000),
      height: Mock.Random.integer(200, 400), // 随机高度
      url: Mock.Random.image('200x' + Mock.Random.integer(200, 400), '#50B347', '#FFF', 'png', '图片' + (i + 1)),
      title: Mock.Random.ctitle(3, 8),
      description: Mock.Random.cparagraph(1, 3)
    })
  }
  return images
}

// 模拟获取瀑布流数据
Mock.mock(/\/api\/waterfall/, 'get', (options) => {
  const page = parseInt(options.url.split('=')[1]) || 1
  const pageSize = 10
  const total = 50 // 模拟总数据量
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total) // 确保不超过总数据量

  // 检查是否还有更多数据
  if (start >= total) {
    return {
      code: 200,
      data: [],
      message: 'success'
    }
  }

  // 模拟分页数据
  const data = generateImageData(end - start)

  return {
    code: 200,
    data: data,
    message: 'success'
  }
})

// 模拟加载更多数据
Mock.mock('/api/waterfall/more', 'get', () => {
  return {
    code: 200,
    data: generateImageData(5), // 每次加载5条新数据
    message: 'success'
  }
})
