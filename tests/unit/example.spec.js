import { shallowMount } from '@vue/test-utils'
import Activity from '@/components/Activity.vue'

describe('Activity.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Watching TV'
    const wrapper = shallowMount(Activity, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
