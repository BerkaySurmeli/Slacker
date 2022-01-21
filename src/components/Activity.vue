<template>
    <div class="activity-class">
        <p v-if="started">
            <span v-if="hour<10 || hour === 0">0{{ hour }}</span>
            <span v-else>{{ hour }}</span> :
            <span v-if="min<10 || min === 0">0{{ min }}</span>
            <span v-else>{{ min }}</span> :
            <span v-if="sec<10 || sec === 0">0{{ sec }}</span>
            <span v-else>{{ sec }}</span>
        </p>
        <h3>{{ activityName }}</h3>
        <h4><span v-if="!started">Total Duration: </span>
            <span v-if="duration.hour<10 || duration.hour === 0">0{{ duration.hour }}</span>
            <span v-else>{{ duration.hour }}</span> :
            <span v-if="duration.min<10 || duration.min === 0">0{{ duration.min }}</span>
            <span v-else>{{ duration.min }}</span> :
            <span v-if="duration.sec<10 || duration.sec === 0">0{{ duration.sec }}</span>
            <span v-else>{{ duration.sec }}</span>
        </h4>
        <p v-if="started!=null">Start time:{{ started }}</p>
        <button v-if = "enableButton" v-on:click="startActivity">Start Activity</button>
    </div>
</template>

<script>
export default {
  name: 'Activity',
  props: ['activityName', 'id', 'score'],
  data () {
    return {
      stopActivityEvent: 'stop-activity-' + this.id,
      duration: { hour: 0, min: 0, sec: 0 },
      started: null,
      enableButton: true,
      sec: 0,
      min: 0,
      hour: 0,
      stopTime: true
    }
  },
  methods: {
    startActivity () {
      // Sets up the activity start date and time
      this.started = this.setupStartDateTime()
      // Disable "Start Activity button"
      this.enableButton = false
      // Start timer for the activity
      if (this.stopTime === true) {
        this.stopTime = false
        this.timerCycle()
        this.sec = 0
        this.min = 0
        this.hour = 0
      } else {
        this.sec = 0
        this.min = 0
        this.hour = 0
      }
      this.emitter.emit('start-activity', this.id)
    },
    /*
     * When a new activity is started,
     * Home component calls method stop this activity
     * 1. Adds current time passed to the total duration
     * 2. Stops the timer
     * 3. Enables start activity button for the user
     */
    stopActivity () {
      this.calculateTotalDuration()
      this.stopTime = true
      this.enableButton = true
    },
    /*
     * Calculates the date and time
     * This is used to show the user when the activity started
     */
    setupStartDateTime () {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const date = new Date()
      const day = days[date.getDay()]
      const month = months[date.getMonth()]
      const dayNum = date.getDate()
      const time = date.toLocaleTimeString()
      return day + ', ' + month + ' ' + dayNum + ' at ' + time
    },
    /*
     * Current time is calculated when this activity is stopped
     * This current time is added to the total activity time for the user to
     * keep track of the total time spent on the activity
     */
    calculateTotalDuration () {
      const currentDurationInSec = (this.hour * 3600) + (this.min * 60) + (this.sec)
      console.log(currentDurationInSec)
      let sec = this.duration.sec + currentDurationInSec
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
      this.sec = 0
      this.min = 0
      this.hour = 0
    },
    /*
     * Timer cycle controls the timer
     * It increments the sec variable every 1 second
     * updates the hour and min variables real time based as time passes
     */
    timerCycle () {
      if (this.stopTime === false) {
        this.sec += 1
        if (this.sec === 60) {
          this.sec = 0
          this.min += 1
        }
        if (this.min === 60) {
          this.sec = 0
          this.min = 0
          this.hour += 1
        }
        setTimeout(function () { this.timerCycle() }.bind(this), 1000)
      }
    }
  },
  mounted () {
    /*
     * When a new activity started home component calls this event
     * to stop the time on this particular activity
     */
    this.emitter.on(this.stopActivityEvent, () => {
      this.stopActivity()
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
