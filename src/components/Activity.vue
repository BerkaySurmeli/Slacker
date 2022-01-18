<template>
    <div class = "activity-class">
        <h3>{{ activityName }}</h3>
        <h4>Total Duration:
            <span v-if="duration.hour<10 || duration.hour === 0">0{{ duration.hour }}</span>
            <span v-else>{{ duration.hour }}</span> :
            <span v-if="duration.min<10 || duration.min === 0">0{{ duration.min }}</span>
            <span v-else>{{ duration.min }}</span> :
            <span v-if="duration.sec<10 || duration.sec === 0">0{{ duration.sec }}</span>
            <span v-else>{{ duration.sec }}</span>
        </h4>
        <p v-if="started!=null">Start time:{{ started }}</p>
        <button v-if = "enableButton" v-on:click="startTime">Start Activity</button>
    </div>
</template>

<script>
export default {
  name: 'Activity',
  props: ['activityName', 'id'],
  data () {
    return {
      stopActivityEvent: 'stop-activity-' + this.id,
      duration: { hour: 0, min: 0, sec: 0 },
      started: null,
      enableButton: true
    }
  },
  methods: {
    startTime () {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const date = new Date()
      const day = days[date.getDay()]
      const month = months[date.getMonth()]
      const dayNum = date.getDate()
      const time = date.toLocaleTimeString()
      this.started = day + ', ' + month + ' ' + dayNum + ' at ' + time
      this.emitter.emit('start-timer', this.id)
      this.enableButton = false
    }
  },
  mounted () {
    this.emitter.on(this.stopActivityEvent, (duration) => {
      console.log(duration)
      let sec = this.duration.sec + duration
      if (sec > 59) {
        let min = this.duration.min + Math.trunc(sec / 60)
        sec = sec % 60
        this.duration.min = min
        if (min > 59) {
          const hour = this.duration.hour + Math.trunc(min / 60)
          min = min % 60
          this.duration.hour = hour
          this.duration.min = min
        }
      }
      this.duration.sec = sec
      this.enableButton = true
      this.started = null
    })
  }
}
</script>
<style>
    .activity-class {
        border: solid 1px black;
        margin: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
