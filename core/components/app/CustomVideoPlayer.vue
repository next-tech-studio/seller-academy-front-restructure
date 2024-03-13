<template>
  <ClientOnly>
    <div>
      <video
        class="video-js"
        controls
        ref="videoElement"
        preload="auto"
      >
        <!-- Video sources -->
        <source :src="videoSrc" type="application/x-mpegURL" />
        <!-- Fallback content -->
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank"
            >supports HTML5 video</a
          >
        </p>
      </video>
    </div>
  </ClientOnly>
</template>

<script setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
const qualityLevels = () => import("videojs-contrib-quality-levels");
const hlsQualitySelector = () => import("videojs-hls-quality-selector");

const videoSrc =
  "https://next-test.arvanvod.ir/ZaMv0Glomq/m1xg0G3eoy/h_,144_200,240_400,360_800,480_1500,720_2500,1080_4500,k.mp4.list/master.m3u8";
let videoElement = ref(null);
async function setupPlayer() {
  // Register the quality selector plugin
  const [qualityLevelsModule, hlsQualitySelectorModule] = await Promise.all([
    qualityLevels(),
    hlsQualitySelector(),
  ]);
  videojs.registerPlugin("qualityLevels", qualityLevelsModule.default);
  videojs.registerPlugin(
    "hlsQualitySelector",
    hlsQualitySelectorModule.default
  );

  await nextTick(); // Wait for the DOM to be updated

  // Check if the videoPlayer reference is correctly set
  if (!videoElement.value) {
    console.error("Video player element not found");
    return;
  }

  // In case 'videoPlayer.value' points to the DOM element
  const player = videojs(videoElement.value, {
    // options
    html5: {
      hls: {
        overrideNative: true,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    },
  });
  console.log(player);

  // Apply the plugin on the player instance
  player.ready(() => {
    player.hlsQualitySelector({ displayCurrentQuality: true });
  });

  // Cleanup on unmount
  onUnmounted(() => {
    if (player) {
      player.dispose();
    }
  });
}

onMounted(setupPlayer);
</script>
