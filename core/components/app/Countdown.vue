<template>
  <span dir="ltr" :class="color">
    <span>{{ model.minutes.toString().padStart(2, "0") }}</span>
    <span>:</span>
    <span>{{ model.seconds.toString().padStart(2, "0") }}</span>
  </span>
</template>
<script>
export default {
  props: ["color", "modelValue"],
  data() {
    return {
      timerHandler: null,
      // period: 1,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    countDown() {
      if (this.model.seconds > 0) {
        this.model.seconds--;
        this.$emit("countDown", this.model);
      } else if (this.model.seconds === 0) {
        if (this.model.minutes > 0) {
          this.model.minutes--;
          this.model.seconds = 59;
        } else if (this.model.minutes === 0) {
          this.$emit("counterStopped");
          clearInterval(this.timerHandler);
        }
      }
    },
    restart() {
      this.model.minutes = 0;
      this.model.seconds = 0;
      this.start();
    },
    start() {
      const self = this;

      // this.model.minutes = this.period;

      this.timerHandler = setInterval(function () {
        self.countDown();
      }, 1000);
    },
    reset(data) {
      this.model.minutes = data.minutes;
      this.model.seconds = data.seconds;
      clearInterval(this.timerHandler);
      this.start();
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    },
  },
};
</script>
