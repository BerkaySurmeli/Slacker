<template>
    <div class ="timer-class">
        <p>
            <span v-if="hour<10 || hour === 0">0{{ hour }}</span>
            <span v-else>{{ hour }}</span> :
            <span v-if="min<10 || min === 0">0{{ min }}</span>
            <span v-else>{{ min }}</span> :
            <span v-if="sec<10 || sec === 0">0{{ sec }}</span>
            <span v-else>{{ sec }}</span>
        </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sec: 0,
      min: 0,
      hour: 0,
      stopTime: true
    }
  },
  methods: {
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
    this.emitter.on('start-chrono', () => {
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
    })
    this.emitter.on('get-duration', () => {
      const hourInSecs = this.hour * 3600
      const minInSecs = this.min * 60
      const totalSuration = hourInSecs + minInSecs + this.sec
      this.emitter.emit('set-duration', totalSuration)
    })
  }
}
</script>
<style>
    .timer-class{
        font-size: 50px;
    }
</style>
