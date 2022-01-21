<template>
  <div class="home">
    <Activity v-for= "activity in activities"
    :key = "activity.id"
    :activityName = "activity.name"
    :id = "activity.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Activity from '@/components/Activity.vue'

export default {
  name: 'Home',
  props: {
  },
  data () {
    return {
      activities: [
        { id: 1, name: 'Watching Netflix', score: 500 },
        { id: 2, name: 'Playing Videogame', score: 250 },
        { id: 3, name: 'Napping', score: 150 },
        { id: 4, name: 'Staring at the ceiling for no reason', score: 400 }
      ],
      currentActivity: null,
      currentDuration: 0
    }
  },
  components: {
    Activity
  },
  mounted () {
    /*
    * This mounted method is called from an activity instance
    * start-activity event is called with the id of the activity
    * to keep track of the current activity
    *
    * If there is already an activity currentlt running
    * this method stops that
    */
    this.emitter.on('start-activity', (id) => {
      if (this.currentActivity) {
        const stopActivityEvent = 'stop-activity-' + this.currentActivity.id
        this.emitter.emit(stopActivityEvent)
      }
      this.currentActivity = this.activities.find(item => item.id === id)
    })
  }
}
</script>
