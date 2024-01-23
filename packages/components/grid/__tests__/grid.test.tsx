import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Grid from '../src/grid.vue'

const AXIOM = 'Rem is the best girl'

describe('Grid.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Grid>{AXIOM}</Grid>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
