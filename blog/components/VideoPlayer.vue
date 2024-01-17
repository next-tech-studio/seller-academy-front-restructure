<template>
  <v-card
    flat
    v-if="videoSrc?.startsWith('https://www.aparat.com')"
    class="h_iframe-aparat_embed_frame"
    :class="
      !$vuetify.display.mdAndUp && isHeader
        ? ' rounded-t-0 rounded-b-lg'
        : 'rounded-lg'
    "
  >
    <span style="display: block; padding-top: 57%"></span>
    <iframe
      :src="videoSrc"
      allowFullScreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
    ></iframe>
  </v-card>
  <v-card
    v-else
    flat
    class="video-player"
    :class="
      !$vuetify.display.mdAndUp && isHeader
        ? ' rounded-t-0 rounded-b-lg'
        : 'rounded-lg'
    "
    dir="ltr"
  >
    <video
      ref="video"
      :src="videoSrc"
      :poster="videoPoster"
      full
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
    ></video>
    <div class="controls">
      <div v-if="isInitial" class="initial">
        <v-btn
          class="play-btn"
          icon
          :size="previewSize"
          @click="playOrPause"
          :loading="!isPlaying && !isInitial"
          theme="dark"
        >
          <v-icon color="white" size="small" class="ml-1">fas fa-play</v-icon>
        </v-btn>
      </div>
      <div v-else class="playing pa-2">
        <v-btn variant="compact" icon :size="small ? 20 : previewSize" @click="playOrPause">
          <v-icon color=" background-scrim-dark" :size="small ? 20 : previewSize">{{
            isPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"
          }}</v-icon>
        </v-btn>
        <div class="time">{{ toHHMMSS(currentTime) }} / {{ toHHMMSS(duration) }}</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
        <div>
          <v-btn
            v-if="options.includes('play')"
            variant="compact"
            icon
            :size="small ? 20 : 'x-small'"
            @click="playOrPause"
          >
            <v-icon size="x-small">fas fa-step-forward</v-icon>
          </v-btn>
          <v-btn
            v-if="options.includes('volume')"
            variant="compact"
            icon
            :size="small ? 20 : 'x-small'"
            @click="mute"
            class="mx-1"
          >
            <v-icon size="x-small">{{
              !isMuted ? "fas fa-volume-up" : "fas fa-volume-mute"
            }}</v-icon>
          </v-btn>
          <v-btn
            v-if="options.includes('cog')"
            variant="compact"
            icon
            :size="small ? 20 : 'x-small'"
            @click="playOrPause"
            class="mx-1"
          >
            <v-icon size="x-small">fa fa-cog</v-icon>
          </v-btn>
          <v-btn
            v-if="options.includes('full-screen')"
            variant="compact"
            icon
            :size="small ? 20 : 'x-small'"
            @click="fullScreen"
            class="mx-1"
          >
            <v-icon size="x-small">fas fa-expand</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <slot />
  </v-card>
</template>

<script>
import { useDisplay } from "vuetify";
export default {
  props: {
    videoSrc: String,
    videoPoster: String,
    maxHeight: String,
    small: Boolean,
    isHeader: Boolean,
    options: {
      type: Array,
      default: ["play", "volume", "cog", "full-screen"],
      validator(value) {
        return ["play", "volume", "cog", "full-screen"].includes(value);
      },
    },
  },
  data() {
    return {
      isInitial: true,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      isMuted: false,
    };
  },
  methods: {
    play() {
      this.$refs.video.play();
      this.isPlaying = true;
    },
    pause() {
      this.$refs.video.pause();
      this.isPlaying = false;
    },
    playOrPause() {
      this.isInitial = false;
      if (this.isPlaying) {
        this.$refs.video.pause();
      } else {
        this.$refs.video.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    stop() {
      this.$refs.video.pause();
      this.$refs.video.currentTime = 0;
      this.isPlaying = false;
    },
    seek(time) {
      this.$refs.video.currentTime = time;
    },
    mute() {
      this.$refs.video.muted = !this.$refs.video.muted;
      this.isMuted = !this.isMuted;
    },
    fullScreen() {
      this.$refs.video.requestFullscreen();
    },
    onPlay() {
      this.isPlaying = true;
    },
    onPause() {
      this.isPlaying = false;
    },
    onTimeUpdate() {
      this.currentTime = Math.floor(this.$refs.video.currentTime);
      this.duration = Math.floor(this.$refs.video.duration);
      this.progress = (this.currentTime / this.duration) * 100;
    },
    toHHMMSS(time) {
      var sec_num = parseInt(time, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return Number(hours) > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
    },
  },
  computed: {
    previewSize() {
      let size = "default";
      if (!this.small) {
        size = "x-large";
      } else if (this.$vuetify.display.smAndDown) {
        size = "x-small";
      }
      return size;
    },
  },
};
</script>

<style>
.h_iframe-aparat_embed_frame {
  position: relative;
}

.h_iframe-aparat_embed_frame .ratio {
  display: block;
  width: 100%;
  height: auto;
}

.h_iframe-aparat_embed_frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>

<style lang="scss" scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  display: flex;
  transition: all 0.2s;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .controls {
    z-index: 10;
  }

  .controls .initial {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .play-btn {
      background-color: rgba(var(--v-theme-background-scrim-dark), 30%);
    }
  }
  .controls:has(.playing) {
    display: none;
  }
  &:hover .controls {
    display: block;
    .playing {
      position: absolute;
      bottom: 2%;
      left: 50%;
      transform: translateX(-50%);
      width: 95%;
      background-color: rgba(45, 45, 45, 65%);
      backdrop-filter: blur(1.31724px);
      display: flex;
      justify-content: space-between;
      padding: 0;
      box-sizing: border-box;
      border-radius: 8.43px;
      display: flex;
      align-items: center;

      button {
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
      }

      .time {
        margin: auto 6px auto 6px;
        font-size: 10px;
        color: white;
        font-weight: 400;
      }

      .progress-bar {
        width: 40%;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.5);
        flex-grow: 1;
        display: flex;

        .progress {
          background-color: white;
        }
      }
    }
  }
}
</style>
