<template>
  <div
    ref="containerRef"
    class="el-grid_box"
    :style="{ height: boxHeight + 'px' }"
    @scroll="handleScroll"
  >
    <div
      v-for="(item, index) in allGridList"
      ref="imageRef"
      :key="index"
      :class="'el-grid ' + nodeClass"
      :style="{ top: item.top + 'px', left: item.left + 'px' }"
    >
      <img :src="item.image" :alt="'Image ' + index" />
      <div class="grid_box">
        <h3 class="grid_title">{{ item.title }}</h3>
        <p class="grid_content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, toRefs, watch } from 'vue'
import { gridProps } from './grid'
import type { listType } from './grid'

const props = defineProps(gridProps)
const { gridList, columnWidth, grap, columnCount, nodeClass } = toRefs(props)
const columnHeights = ref(
  Array.from({ length: columnCount.value }, (_, i) => 0)
)

defineOptions({
  name: 'ElGrid',
})
const allGridList = ref<Array<listType>>([])

onMounted(() => {
  window.addEventListener('resize', () => {
    columnHeights.value = Array.from({ length: columnCount.value }, (_, i) => 0)
    layoutItems(allGridList.value as Array<listType>)
  })
})
const imageRef = ref()
const boxHeight = ref(0)
// 定义一个方法来设置元素的引用，使用 index 作为 key

const layoutItems = async (list: Array<listType>) => {
  await nextTick()
  let currentShortestColumn = 0
  const length = allGridList.value.length - list.length
  for (const [i, item] of list.entries()) {
    // 找到当前最短的列
    currentShortestColumn = columnHeights.value.indexOf(
      Math.min(...columnHeights.value)
    )

    // 设置图片的位置
    item.left =
      currentShortestColumn * (columnWidth.value + grap.value) +
      currentShortestColumn * grap.value
    item.top = columnHeights.value[currentShortestColumn]

    // 更新列的高度

    columnHeights.value[currentShortestColumn] +=
      imageRef.value[length + i].offsetHeight + grap.value

    // 将项目添加到渲染列表中

    allGridList.value[length + i] = { ...item, top: item.top, left: item.left }
  }
  // 找到当前最长的列
  const maxHeight = columnHeights.value.indexOf(
    Math.max(...columnHeights.value)
  )
  // 最长列高度就是父元素高度
  boxHeight.value = columnHeights.value[maxHeight]
}
watch(
  gridList,
  (nweVlaue) => {
    allGridList.value = allGridList.value.concat(nweVlaue)
    layoutItems(gridList.value)
  },
  { immediate: true }
)

// init here
</script>
