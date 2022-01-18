<template>
  <div class="home">
    <h1 v-if="currentActivity">Current Activity: {{ currentActivity.name }}</h1>
    <Timer/>
    <Activity v-for= "activity in activities"
    :key = "activity.id"
    :activityName = "activity.name"
    :id = "activity.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Activity from '@/components/Activity.vue'
import Timer from '@/components/Timer.vue'

export default {
  name: 'Home',
  props: {
  },
  data () {
    return {
      activities: [
        { id: 1, name: 'Watching Tv' },
        { id: 2, name: 'Playing Videogame' },
        { id: 3, name: 'Working' },
        { id: 4, name: 'Doing laundry' },
        { id: 5, name: 'Washing Dishes' }
      ],
      currentActivity: null,
      currentDuration: 0
    }
  },
  components: {
    Activity,
    Timer
  },
  mounted () {
    this.emitter.on('start-timer', (id) => {
      if (this.currentActivity) {
        const stopActivityEvent = 'stop-activity-' + this.currentActivity.id
        this.emitter.emit('get-duration')
        this.emitter.emit(stopActivityEvent, this.currentDuration)
      }
      this.currentActivity = this.activities.find(item => item.id === id)
      this.emitter.emit('start-chrono')
    })
    this.emitter.on('set-duration', (duration) => {
      this.currentDuration = duration
    })
  }
}
</script>
