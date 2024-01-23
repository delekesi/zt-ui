import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'
import type Grid from './grid.vue'
export type listType = {
  image: string
  top: number
  left: number
  title: string
  content: string
}
export const gridProps = buildProps({
  /**
   * @description 渲染列表
   */
  gridList: {
    type: Array as () => listType[],
    default: [],
  },
  /**
   * @description 列宽
   */
  columnWidth: {
    type: Number,
    default: 200,
  },
  /**
   * @description 列数
   */
  columnCount: {
    type: Number,
    default: 3,
  },
  /**
   * @description 瀑布流各模块间距
   */
  grap: {
    type: Number,
    default: 10,
  },
  nodeClass: {
    type: String,
    default: '',
  },
} as const)
export type GridProps = ExtractPropTypes<typeof gridProps>
export type GridUlInstance = InstanceType<typeof Grid>
